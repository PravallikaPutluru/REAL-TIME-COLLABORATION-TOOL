const socket = io();
const editor = document.getElementById("editor");

// Load existing text
socket.on("load-text", (data) => {
    editor.value = data;
});

// Send text updates
editor.addEventListener("input", () => {
    socket.emit("text-change", editor.value);
});

// Receive updates from others
socket.on("text-change", (data) => {
    editor.value = data;
});
