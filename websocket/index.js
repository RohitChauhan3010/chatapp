const express = require("express");
const cors = require("cors")
const socketio = require("socket.io");
const http = require("http");
const { userJoin, getRoomUsers, getCurrentUser, userLeave } = require("./utils/user");
const formateMessage = require("./utils/message");

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    console.log("One user has joined");

    socket.on("joinRoom", ({ username, room }) => {
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        console.log(username)
        socket.emit("message", formateMessage("Welcome!", `${user.username} has been join.`));

        socket.broadcast.to(user.room).emit("message", formateMessage(`${username} has joined the chat`));

        io.to(room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room)

        });
        console.log(user.room)
    });

    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        console.log(user.username)
        io.to(user.room).emit("message", formateMessage(user.username, msg));
        console.log(msg)

    });

    socket.on("disconnect", () => {
        const user = userLeave(socket.id);
        console.log("One user has left");

        if (user) {
            // Broadcast to other users on leaving
            io.to(user.room).emit("message", formateMessage(`${user.username} has left the chat`));
            io.to(user.room).emit('roomUsers', user.room, getRoomUsers(user.room));

        }
    });


});



server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
