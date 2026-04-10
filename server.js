const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let textData = "";

io.on("connection", (socket) => {
    console.log("User connected");

    // Send existing text to new user
    socket.emit("load-text", textData);

    // Receive text updates
    socket.on("text-change", (data) => {
        textData = data;
        socket.broadcast.emit("text-change", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
