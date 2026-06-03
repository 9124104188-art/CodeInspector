const form = document.querySelector('#review-form');
const codeInput = document.querySelector('#code-input');
const languageInput = document.querySelector('#language');
const output = document.querySelector('#output');
const reviewText = document.querySelector('#review-text');
const button = form.querySelector('button[type="submit"]');
button.disabled = false; 

codeInput.addEventListener('input', () => {
    document.querySelector('#char-count').textContent =
        `${codeInput.value.length} characters`;
});

document
    .querySelector('#code-file')
    .addEventListener('change', async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        const text = await file.text();

        codeInput.value = text;

        document.querySelector('#char-count').textContent =
            `${text.length} characters`;
    });




form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const code = codeInput.value;
    const language = languageInput.value;
    output.classList.remove('is-error');
    output.classList.add('is-loading');
    button.disabled = true; // Disable the button during review

    if (code.trim()==='') {
        reviewText.textContent = 'Please paste some code first.';
        output.classList.remove('is-loading');
        output.classList.add('is-error');
        button.disabled = false; // Re-enable the button if no code is provided        
        return;
        
    }
    else{
        reviewText.textContent = 'Reviewing code...';
        console.log({language, codeLength: code.length});
        try{
            const response = await fetch('http://localhost:3000/api/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language, code })
        })
        if(!response.ok){
            throw new Error('server error: '+response.status);
        }

        const data = await response.json();
        reviewText.innerHTML =marked.parse(data.review || 'No review generated.');

        }
        catch(error){
            reviewText.textContent = 'Error reviewing code. Please try again.';
            console.error('Error:', error);
            output.classList.add('is-error');
        }
        finally{
            output.classList.remove('is-loading');
            button.disabled = false; // Re-enable the button after review
        }
        
        
    }

});

document
    .querySelector('#copy-review')
    .addEventListener('click', () => {

        navigator.clipboard.writeText(
            reviewText.innerText
        );

        alert('Review copied!');
    });

    





