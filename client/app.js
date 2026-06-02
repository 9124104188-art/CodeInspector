const form = document.querySelector('#review-form');
const codeInput = document.querySelector('#code-input');
const languageInput = document.querySelector('#language');
const output = document.querySelector('#output');

eventListener('submit', async (e) => {

    event.preventDefault();

    const code = codeInput.value;
    const language = languageInput.value;
    if (!code || !language) {
        output.textContent = 'Please provide both code and language.';
        return;
    }
    else{
        output.textContent = 'Reviewing code...';
        console.log({language, codeLength: code.length});
    }


}

);
