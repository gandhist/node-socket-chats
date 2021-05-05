const chatForm = document.getElementById('chat-form')
const socket = io("ws://localhost:3000");
// const socket = io();
const chatMessage = document.getElementById('messageArea')
const roomName = document.getElementById('room-name')
const usersLists = document.getElementById('users')
const oldMessages = document.getElementById('oldMessage')

// get query string
const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})


// join chatroom
socket.emit('joinRoom', {username, room})

// LISTENER message from server
socket.on('message', message => {
    outputMessage(message)
    chatMessage.scrollTop = chatMessage.scrollHeight;
})

// LISTENER 
socket.on('roomUsers', ({room, users, message}) => {
    console.log('room',room)
    console.log('users',users)
    console.log('messages ',message)
    // manipulate dom html
    outputOldMessage(message)
    outputRoomName(room)
    outputUser(users)
})

// message submit listener
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // get message text
    const msg = e.target.elements.msg.value
    //emmit message to server
    socket.emit('chatMessage',{msg, username, room})

    // clear message
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus()
})

// output message to dom
function outputMessage(message) {
    console.log('message ini', message)
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
    <div class="${message.username === username ? 'mr-2' : 'ml-2'} mt-1 d-flex align-items-${message.username === username ? 'end' : 'start'} flex-column bd-highlight">
    <div class="alert alert-${message.username === username ? 'success' : 'info'}" role="alert" style="max-width: 200px; min-width: 200px;">
    <h6 class="alert-heading">${message.username} - ${message.time}</h6>
    ${message.text}
    </div>
                      </div>
    `
    document.getElementById('messageArea').appendChild(div)

}

// output old message 
function outputOldMessage(messages) {

    let chat = 
    `${
        messages.map( message => {
            console.log('ini msg loop', message)
            return (`
        <div class="${message.username === username ? 'mr-2' : 'ml-2'} mt-1 d-flex align-items-${message.username === username ? 'end' : 'start'} flex-column bd-highlight">
    <div class="alert alert-${message.username === username ? 'success' : 'info'}" role="alert" style="max-width: 200px; min-width: 200px;">
    <h6 class="alert-heading">${message.username} - ${message.time}</h6>
    ${message.message}
    </div>
                      </div>
        `)
        } 
            ).join('')
    }`
    console.log('is ghcat', oldMessages)
    oldMessages.innerHTML = chat
    // console.log('message lama ini', message)
}

// output room name
function outputRoomName(room){
    roomName.innerText = `Room name: ${room}`
}

//output user in the room
function outputUser(users){
    console.log('bentuk users', users)
    usersLists.innerHTML = `${users.map(user => `<li class="list-group-item list-group-item-light">${user.username}</li>`).join('')}`
}