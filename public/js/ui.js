function updateConnectionStatus(isConnected) {

    const status = document.getElementById("connection-status");

    status.textContent = isConnected
        ? "🟢 Connected"
        : "🔴 Disconnected";

}

function updateOnlineCount(count) {

    document.getElementById("online-count").textContent =
        `(${count})`;

}

function renderUsers(users) {

    const container = document.getElementById("users-list");

    container.innerHTML = "";

    users.forEach(user => {

        const div = document.createElement("div");

        div.className = "user";

        div.innerHTML = `🟢 ${user.username}`;

        container.appendChild(div);

    });

}

function renderSystemMessage(message) {

    const messages = document.getElementById("messages");

    const div = document.createElement("div");

    div.style.textAlign = "center";
    div.style.margin = "12px 0";
    div.style.color = "#6b7280";
    div.style.fontStyle = "italic";

    div.textContent = message;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;

}