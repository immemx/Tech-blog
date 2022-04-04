const usernameEl = document.querySelector('#username')
const passwordEl = document.querySelector('#password')

async function loginFormHandler(e) {
    e.preventDefault();
    const user_name = usernameEl.value.trim();
    const password = userPasswordEl.value.trim();

    if(user_name && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                user_name,
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






document.addEventListener('submit', loginFormHandler)