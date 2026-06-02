const form = document.querySelector('#review-form');
const codeInput = document.querySelector('#code-input');
const languageInput = document.querySelector('#language');
const output = document.querySelector('#output');

form.eventListener('submit', async (e) => {

    e.preventDefault();

});

    const code = codeInput.value;
    const language = languageInput.value;
    if (!code) {
        output.textContent = 'Please provide both code and language.';
        return;
    }
    else{
        output.textContent = 'Reviewing code...';
        console.log({language, codeLength: code.length});
    }





