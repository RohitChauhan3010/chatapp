
const chatForm = document.getElementById("chat-form");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("user");
const chatMessage = document.querySelector(".chat-messages");
const messageInput = document.getElementById("msg");

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const room = urlParams.get("room");


const socket = io("http://localhost:3000/", { transports: ["websocket"] });

socket.emit("joinRoom", { username, room });

socket.on("message", (message) => {
    outputMessage(message);
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = messageInput.value;
    console.log(msg)
    if (msg) {
        socket.emit('chatMessage', msg);
        messageInput.value = "";
        messageInput.focus();
    }
});

socket.on('roomUsers', (room, user) => {
    roomName.innerText = room.room;
    outputRoomUsers(room.users);
});




function outputRoomUsers(user) {
    userList.innerHTML = "";
    if (user) {
        user.forEach((user) => {
            const li = document.createElement("li");
            li.innerText = user.username;
            userList.append(li);
        });

    }
}

function outputMessage(message) {
    // console.log("starting", message);

    const div = document.createElement("div");
    div.classList.add("message");

    const p = document.createElement("p");
    p.classList.add("text");

    p.innerText = message.username;
    p.innerHTML += `<span> ${message.time} </span>`;

    div.appendChild(p);

    const para = document.createElement("p");
    para.classList.add("text");

    if (message.text) {
        // console.log("text message", message.text);
        para.innerText = message.text;
    }

    div.appendChild(para);
    chatMessage.appendChild(div);
}


const leaveButton = document.getElementById("leave-btn");
leaveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmLeave = confirm("Are you sure you want to leave?");
    if (confirmLeave) {
        socket.emit("leaveRoom");

        setTimeout(() => {
            window.location.href = "join.html";
        }, 5000);
        handleUserLeave(username);
    }
});

function handleUserLeave(username) {
    console.log("testing:", username);
    const leavingMessage = document.createElement("p");
    leavingMessage.classList.add("text");
    leavingMessage.textContent = `${username} has left the chat`;
    console.log("testing2:", leavingMessage);
    const chatMessages = document.querySelector(".chat-messages");
    chatMessages.appendChild(leavingMessage);
    console.log("testing3:", chatMessage);
}




// const leaveButton = document.getElementById("leave-btn");
// leaveButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     const confirmLeave = confirm("Are you sure you want to leave?");
//     if (confirmLeave) {
//         socket.emit("leaveRoom");
//         setTimeout(() => {
//             window.location.href = "join.html";
//         }, 20000);
//     }
//     handleUserLeave(username)
// });


// function handleUserLeave(username) {
//    console.log("testing:",username)
//     const leavingMessage = document.createElement("p");
//     leavingMessage.classList.add("text");
//     leavingMessage.textContent = `${username} has left the chat`;
//     console.log("testing2:",leavingMessage)
//     const chatMessages = document.querySelector(".chat-messages");
//     chatMessages.appendChild(leavingMessage);
//     console.log("testing3:",chatMessage)

// }
