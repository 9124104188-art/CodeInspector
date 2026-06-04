const form = document.querySelector('#review-form');
const languageInput = document.querySelector('#language');
const output = document.querySelector('#output');
const outputTitle = document.querySelector('#output-title');
const reviewText = document.querySelector('#review-text');
const reviewBtn = form.querySelector('button[type="submit"]');
const copyBtn = document.querySelector('#copy-review');
const explainBtn = document.querySelector('#explain-btn');
const fileInput = document.querySelector('#code-file');
const charCount = document.querySelector('#char-count');

let editor;

const API_BASE_URL = 'http://localhost:3000';

const monacoLanguageMap = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'cpp'
};

function getCode() {
  return editor ? editor.getValue() : '';
}

function setLoading(message) {
  output.classList.remove('is-error');
  output.classList.add('is-loading');
  reviewText.innerHTML = `
    <div class="loader"></div>
    <p class="loading-text">${message}</p>
  `;
}

function stopLoading() {
  output.classList.remove('is-loading');
}

function showError(message) {
  output.classList.remove('is-loading');
  output.classList.add('is-error');
  reviewText.textContent = message;
}

function updateCharCount() {
  const code = getCode();
  const lines = code ? code.split('\n').length : 0;
  charCount.textContent = `${code.length} characters • ${lines} lines`;
}

function renderMarkdown(markdownText) {
  const html = marked.parse(markdownText || 'No output generated.');
  reviewText.innerHTML = html;

  reviewText.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });
}

function enhanceReviewScore() {
  reviewText.innerHTML = reviewText.innerHTML.replace(
    /Score:\s*(\d+(?:\.\d+)?\/10)/gi,
    'Score: <span class="score">$1</span>'
  );
}

function setButtonsDisabled(disabled) {
  reviewBtn.disabled = disabled;
  explainBtn.disabled = disabled;
}

languageInput.addEventListener('change', () => {
  if (!editor) return;

  const selectedLanguage = monacoLanguageMap[languageInput.value] || 'javascript';
  monaco.editor.setModelLanguage(editor.getModel(), selectedLanguage);
});

require.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs'
  }
});

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: '',
    language: 'python',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false
  });

  editor.onDidChangeModelContent(updateCharCount);
  updateCharCount();
});

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const text = await file.text();
  editor.setValue(text);
  updateCharCount();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const code = getCode();
  const language = languageInput.value;

  outputTitle.textContent = 'Review Output';
  reviewText.innerHTML = '';

  if (!code.trim()) {
    showError('Please paste some code first.');
    return;
  }

  setLoading('Reviewing code...');
  setButtonsDisabled(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language, code })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Server error: ${response.status}`);
    }

    renderMarkdown(data.review);
    enhanceReviewScore();
  } catch (error) {
    console.error('Review error:', error);
    showError('Error reviewing code. Please check that the backend server is running.');
  } finally {
    stopLoading();
    setButtonsDisabled(false);
  }
});

explainBtn.addEventListener('click', async () => {
  const code = getCode();
  const language = languageInput.value;

  outputTitle.textContent = 'Explain Output';
  reviewText.innerHTML = '';

  if (!code.trim()) {
    showError('Please enter some code first.');
    return;
  }

  setLoading('Explaining code...');
  setButtonsDisabled(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ language, code })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Server error: ${response.status}`);
    }

    renderMarkdown(data.explanation);
  } catch (error) {
    console.error('Explain error:', error);
    showError('Error explaining code. Please check that the backend server is running.');
  } finally {
    stopLoading();
    setButtonsDisabled(false);
  }
});

copyBtn.addEventListener('click', async () => {
  const text = reviewText.innerText.trim();

  if (!text) {
    alert('Nothing to copy yet.');
    return;
  }

  await navigator.clipboard.writeText(text);
  alert('Output copied!');
});
