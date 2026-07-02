// ======================================================
// Elements
// ======================================================

const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-btn");
const messagesContainer = document.getElementById("messages");

// ======================================================
// Initialize
// ======================================================

function registerChatEvents() {

    socket.on("message", (message) => {

        renderMessage(message);

    });

}

// ======================================================
// Events
// ======================================================

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", (event) => {

    // Enter = Send
    // Shift + Enter = New Line

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();

    }

});

// ======================================================
// Send
// ======================================================

function sendMessage() {

    if (!socket) {
        return;
    }

    if (!socket.connected) {
        return;
    }

    const text = messageInput.value.trim();

    if (!text) {
        return;
    }

    socket.emit("message", {
        text
    });

    messageInput.value = "";

    messageInput.focus();

}

// ======================================================
// Render Chat Message
// ======================================================

function renderMessage(message) {

    const currentUser =
        localStorage.getItem("office-chat-username");

    const mine =
        message.username === currentUser;

    const wrapper =
        document.createElement("div");

    wrapper.className =
        mine
            ? "message mine"
            : "message other";

    wrapper.innerHTML = `

        <div class="message-card">

            <div class="message-header">

                <span>${escapeHtml(message.username)}</span>

                <span class="message-time">

                    ${message.time}

                </span>

            </div>

            <div class="message-text">

                ${escapeHtml(message.text)}

            </div>

        </div>

    `;

    messagesContainer.appendChild(wrapper);

    scrollToBottom();

}

// ======================================================
// System Message
// ======================================================

function renderSystemMessage(text) {

    const div =
        document.createElement("div");

    div.className =
        "system-message";

    div.textContent =
        text;

    messagesContainer.appendChild(div);

    scrollToBottom();

}

// ======================================================
// Helpers
// ======================================================

function scrollToBottom() {

    messagesContainer.scrollTop =
        messagesContainer.scrollHeight;

}

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}