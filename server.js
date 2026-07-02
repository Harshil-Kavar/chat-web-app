const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const {
    addUser,
    removeUser,
    getUser,
    usernameExists,
    getUsers,
    getUserCount,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

io.on("connection", (socket) => {

    console.log(`🟢 Connected : ${socket.id}`);

    // =============================
    // JOIN
    // =============================

    socket.on("join", ({ username }) => {

        username = (username || "").trim();

        if (!username) {
            socket.emit("join-error", {
                message: "Username is required."
            });
            return;
        }

        if (usernameExists(username)) {
            socket.emit("join-error", {
                message: "Username already exists."
            });
            return;
        }

        const user = addUser(socket.id, username);

        console.log(`👤 ${user.username} joined`);

        io.emit("users", {
            count: getUserCount(),
            users: getUsers()
        });

        io.emit("notification", {
            message: `${user.username} joined the chat.`
        });

    });

    // =============================
    // MESSAGE
    // =============================

    socket.on("message", ({ text }) => {

        const user = getUser(socket.id);

        if (!user) return;

        text = (text || "").trim();

        if (!text) return;

        if (text.length > 500) return;

        // stop typing immediately
        socket.broadcast.emit("typing", {
            username: "",
            active: false
        });

        io.emit("message", {
            username: user.username,
            text,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        });

    });

    // =============================
    // TYPING
    // =============================

    socket.on("typing", ({ active }) => {

        const user = getUser(socket.id);

        if (!user) return;

        socket.broadcast.emit("typing", {
            username: user.username,
            active
        });

    });

    // =============================
    // DISCONNECT
    // =============================

    socket.on("disconnect", () => {

        const user = removeUser(socket.id);

        if (!user) return;

        console.log(`👋 ${user.username} left`);

        io.emit("users", {
            count: getUserCount(),
            users: getUsers()
        });

        io.emit("notification", {
            message: `${user.username} left the chat.`
        });

        socket.broadcast.emit("typing", {
            username: "",
            active: false
        });

    });

});

server.listen(PORT, "0.0.0.0", () => {

    console.log("");
    console.log("=========================================");
    console.log("        Office Chat Server");
    console.log("=========================================");
    console.log(`Local   : http://localhost:${PORT}`);
    console.log(`Network : http://YOUR_LOCAL_IP:${PORT}`);
    console.log("=========================================");
    console.log("");

});