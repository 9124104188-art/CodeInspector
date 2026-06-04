# 🚀 AI Code Reviewer

AI Code Reviewer is a full-stack web application that helps developers improve their code using Google's Gemini AI. Users can paste code, upload source files, receive detailed code reviews, and get beginner-friendly explanations of how their code works.

## ✨ Features

* 🔍 AI-powered code reviews
* 📖 Code explanation and execution flow analysis
* 💡 Bug detection and improvement suggestions
* ⚡ Syntax highlighting for reviewed code
* 📝 Monaco Editor integration
* 📂 Upload code files for review
* 📊 Code quality scoring
* 🎨 Modern responsive UI
* ☁️ Live deployment on Render

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Monaco Editor
* Marked.js
* Highlight.js

### Backend

* Node.js
* Express.js
* Google Gemini AI API
* CORS
* Dotenv

## 📁 Project Structure

```text
CodeInspector/
│
├── client/
│   ├── index.html
│   ├── app.js
│   └── styles.css
│
├── server/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/CodeInspector.git
cd CodeInspector
```

### 2. Install Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server` folder:

```env
GEMINI_API_KEY=your_google_ai_studio_api_key
```

### 4. Run the Application

```bash
node server.js
```

The backend will start on:

```text
http://localhost:3000
```

Open the frontend in your browser.

## 📸 Screenshots

### Home Page

<img width="863" height="906" alt="image" src="https://github.com/user-attachments/assets/e1029ddb-674b-413c-aef4-54fa2a2b45b8" />


### Code Review Output

<img width="630" height="892" alt="image" src="https://github.com/user-attachments/assets/52ce5318-7e37-420b-888a-d94ce1843528" />
<img width="560" height="756" alt="image" src="https://github.com/user-attachments/assets/cc4da44f-f2c3-49be-acb8-78c966bd9dff" />
<img width="623" height="897" alt="image" src="https://github.com/user-attachments/assets/0ef00289-a2aa-4547-b39f-22705ec24b46" />

## 🎯 How It Works

1. User enters or uploads source code.
2. Frontend sends the code to the Express backend.
3. Backend generates a Gemini AI prompt.
4. Gemini analyzes the code.
5. AI returns:

   * Quality score
   * Summary
   * Bugs
   * Security issues
   * Performance suggestions
   * Improved code
6. Results are displayed with syntax highlighting.

## 🌐 Deployment

The application is deployed using:

* GitHub
* Render
* Google Gemini API

## 🔮 Future Improvements

* PDF export
* Review history
* Multiple AI model selection
* Dark/Light mode
* Code comparison view
* Authentication system
* Team collaboration features

## 🌐 Live Demo

👉 https://codeinspector.onrender.com

## 👨‍💻 Author

**S. Yeswanth Kumar**

* Computer Science and Engineering Student
* Passionate about Web Development and Software Engineering

## 📄 License

This project is licensed under the MIT License.
