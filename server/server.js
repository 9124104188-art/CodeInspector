const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '../client')));

if (!process.env.GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. Create server/.env with GEMINI_API_KEY=your_key');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

function cleanLanguage(language) {
  return (language || 'unknown').toString().replace(/[^a-zA-Z0-9+#-]/g, '').slice(0, 30);
}

function cleanGeminiText(text) {
  return (text || '').trim();
}

app.post('/api/review', async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!code || code.trim() === '') {
      return res.status(400).json({ error: 'Code is required.' });
    }

    const lang = cleanLanguage(language);

    const prompt = `
You are a senior software engineer reviewing code for a student portfolio project.

Return ONLY markdown. Do not add extra intro text.

Use this exact structure:

# Code Quality Score
Score: X/10

Write one short reason for the score.

# Summary
- What the code does
- Overall quality

# Bugs
- List bugs or write "No major bugs found."

# Security Issues
- List security problems or write "No security issues found."

# Performance Concerns
- List performance concerns or write "No major performance concerns."

# Readability
- Mention naming, formatting, comments, and structure.

# Best Practices
- Mention best practices the code follows or misses.

# Suggested Fixes
Explain the most useful fixes in bullet points.

# Improved Code
\`\`\`${lang}
Return improved code here. If no change is needed, return the original code with small useful improvements only.
\`\`\`

Rules:
- Be clear and practical.
- Do not overpraise simple code.
- Do not invent issues.
- Keep the answer beginner-friendly.

Language: ${lang}

Code:
\`\`\`${lang}
${code}
\`\`\`
`;

    const result = await model.generateContent(prompt);
    const reviewText = cleanGeminiText(result.response.text());

    return res.json({ review: reviewText });
  } catch (err) {
    console.error('Gemini review error:', err);
    return res.status(500).json({ error: 'Failed to generate review.' });
  }
});

app.post('/api/explain', async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!code || code.trim() === '') {
      return res.status(400).json({ error: 'Code is required.' });
    }

    const lang = cleanLanguage(language);

    const prompt = `
    You are an expert programming tutor.

Explain the code using markdown.

# Overall Purpose
Explain what the program does.

# Code Breakdown
Explain each important line or block.

# Key Concepts
List important concepts with short explanations.

# Execution Flow
Explain step-by-step how the program runs.

# Expected Output
Show only the output.

# Beginner Notes
Provide 3-5 beginner-friendly tips.

Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`
`;


    const result = await model.generateContent(prompt);
    const explanation = cleanGeminiText(result.response.text());

    return res.json({ explanation });
  } catch (err) {
    console.error('Gemini explain error:', err);
    return res.status(500).json({ error: 'Failed to explain code.' });
  }
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
