let socket = null;

function connectSocket(username) {
  socket = io();

  socket.on("connect", () => {
    console.log("✅ Connected");

    updateConnectionStatus(true);

    registerChatEvents();

    socket.emit("join", {
      username,
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected");

    updateConnectionStatus(false);
  });

  // Username already exists
  socket.on("join-error", ({ message }) => {
    alert(message);

    localStorage.removeItem("office-chat-username");

    location.reload();
  });

  // Online users
  socket.on("users", ({ count, users }) => {
    console.log(users);

    renderUsers(users);

    updateOnlineCount(count);
  });

  // System notifications
  socket.on("notification", ({ message }) => {
    addSystemMessage(message);
  });
}
