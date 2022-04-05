const usernameEl = document.querySelector('#username');
const passwordEl = document.querySelector('#password');
const emailEl = document.querySelector('#email');

const signupFormHandler = async (event) => {
    event.preventDefault();

    const user_name = usernameEl.value.trim();
    const password = passwordEl.value.trim();
    const email = emailEl.value.trim();

    if(user_name && password && email) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({
                user_name,
                email,
                password
            }),
            headers: {'Content-Type':'application/json'}
        })

        if(response.ok){
            document.location.replace('/');
        } 
        else {
            alert(response.statusText);
        } 
    }
}


document.addEventListener('submit', signupFormHandler)