//server goes here
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/review', (req, res) => {
    const { language, code } = req.body;

    if(!code||code.trim()===''){
        return res.status(400).json({ error: 'Code is required.' });
    }

    res.json({ review: `This is a placeholder review for ${language} code of length ${code.length}.` });
    
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});