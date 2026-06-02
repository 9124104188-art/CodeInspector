const form = document.querySelector('#review-form');
const codeInput = document.querySelector('#code-input');
const languageInput = document.querySelector('#language');
const output = document.querySelector('#output');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const code = codeInput.value;
    const language = languageInput.value;
    if (code.trim()==='') {
        output.textContent = 'Please paste some code first.';
        
    }
    else{
        output.textContent = 'Reviewing code...';
        console.log({language, codeLength: code.length});
        try{
            fetch('http://localhost:3000/api/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language, code })
        })

        const data = await response.json();
        output.textContent = data.review||'No review generated.';

        }
        catch(error){
            output.textContent = 'Error reviewing code. Please try again.';
            console.error('Error:', error);
        }
        
        
    }

});

    





