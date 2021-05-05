const chatForm = document.getElementById('login-form')


// listener on submit clicked
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // get message text
    const username = e.target.elements.username.value
    const room = e.target.elements.room.value

    // check to table
    fetch(`http://localhost:3000/login`,{
        method: 'POST',
    }).then(res => console.log('response',))
    console.log(username, room)
})