const form = document.querySelector('#review-form');
const codeInput = document.querySelector('#code-input');
const languageInput = document.querySelector('#language');
const output = document.querySelector('#output');
const reviewText = document.querySelector('#review-text');
const button = form.querySelector('button[type="submit"]');
button.disabled = false; 

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
            const response = await fetch('/api/review', {
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
        reviewText.textContent = data.review||'No review generated.';

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

    





