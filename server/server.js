const path = require('path');

const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve the client
app.use(express.static(path.join(__dirname, '../client')));

// Gemini model
if (!process.env.GEMINI_API_KEY) {
  console.warn(
    'Warning: GEMINI_API_KEY is not set. Create server/.env with GEMINI_API_KEY=...'
  );
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// API
app.post('/api/review', async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!code || code.trim() === '') {
      return res.status(400).json({ error: 'Code is required.' });
    }

    const lang = (language || 'unknown').toString().slice(0, 30);

    const prompt = `
    You are a senior software engineer.

    Review the following code.

    Return the result in Markdown.

    # Code Quality Score
    Give a score out of 10.

    # Bugs

    # Security Issues

    # Performance Concerns

    # Readability

    # Best Practices

    # Suggested Fixes

    Language:
    ${lang}

    Code:
    ${code}
    `;

    const result = await model.generateContent(prompt);
    const reviewText = result.response.text();

    return res.json({ review: reviewText });
  } catch (err) {
    console.error('Gemini error:', err);
    return res.status(500).json({ error: 'Failed to generate review.' });
  }
});

// Start
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});