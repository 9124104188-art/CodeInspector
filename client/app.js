const form = document.querySelector('#review-form');
const codeInput = document.querySelector('#code-input');
const languageInput = document.querySelector('#language');
const output = document.querySelector('#output');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const code = codeInput.value;
    const language = languageInput.value;
    if (code.trim()) {
        output.textContent = 'Please provide code.';
        return;
    }
    else{
        output.textContent = 'Reviewing code...';
        console.log({language, codeLength: code.length});
    }

});

    





