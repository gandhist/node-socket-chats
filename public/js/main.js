const chatForm = document.getElementById('chat-form')
const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsdW1lbi1qd3QiLCJpZCI6MjgsImxhc3RfbG9naW4iOiIyMDE5LTEwLTE1IDE5OjMzOjA3IiwibmFtZSI6Ijg4ODg4Iiwiand0X2NyZWF0ZWRfYXQiOjE1NzExNDI3OTksImp3dF9leHAiOjE4ODY1MDI3OTl9.LyFhGdPvv8koLbkghTUhSjZhUqY41RJ2TybWexXUvqU";
const socket = io("ws://localhost:3000",{
    auth: {
        jwtToken: jwtToken
    }
  });
// const socket = io();
const chatMessage = document.getElementById('messageArea')
const roomName = document.getElementById('room-name')
const usersLists = document.getElementById('users')
const oldMessages = document.getElementById('oldMessage')


const ad = parseJwt(jwtToken)

// get query string
const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
})

// listener on error
// client-side
socket.on("connect_error", (err) => {
    // console.log(err instanceof Error); // true
    // console.log('ini connect error',err.message); // prints the message associated with the error
    // console.log(err.data); // { content: "Please retry later" }
    if(err instanceof Error){
        alert(`websocket error: ${err.message}`)
    }
  });

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


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// output message to dom
function outputMessage(message) {
    console.log('message ini', message)
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
    <div class="${message.username === username ? 'mr-1' : 'ml-1'} mt-1 d-flex align-items-${message.username === username ? 'end w-100' : 'start w-75'} flex-column bd-highlight">
    <div class="alert alert-${message.username === username ? 'success' : 'info'}" role="alert" >
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
        <div class="${message.username === username ? 'mr-1' : 'ml-1'} mt-1 d-flex align-items-${message.username === username ? 'end w-100' : 'start w-75'} flex-column bd-highlight">
    <div class="alert alert-${message.username === username ? 'success' : 'info'}" role="alert" >
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