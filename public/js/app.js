const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");

const usernameInput = document.getElementById("username");
const joinButton = document.getElementById("join-btn");

const currentUser = document.getElementById("current-user");

window.addEventListener("DOMContentLoaded", () => {

    const savedUsername = localStorage.getItem("office-chat-username");

    if (savedUsername) {

        enterChat(savedUsername);

    } else {

        usernameInput.focus();

    }

});

joinButton.addEventListener("click", joinChat);

usernameInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        joinChat();

    }

});

function joinChat() {

    const username = usernameInput.value.trim();

    if (!username) {

        alert("Please enter your name.");

        usernameInput.focus();

        return;

    }

    if (username.length > 20) {

        alert("Maximum 20 characters allowed.");

        return;

    }

    localStorage.setItem("office-chat-username", username);

    enterChat(username);

}

function enterChat(username) {

    loginScreen.classList.add("hidden");

    chatScreen.classList.remove("hidden");

    currentUser.textContent = `👤 ${username}`;

    connectSocket(username);

}

function logout() {

    localStorage.removeItem("office-chat-username");

    location.reload();

}