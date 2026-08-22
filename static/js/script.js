console.log("RaagaSetu Started");
// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("theme-toggle");

// Previous theme load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.innerHTML = "☀️";
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            themeToggle.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.innerHTML = "🌙";
        }

    });
}
// =========================
// CHATBOT
// =========================

const chatBtn = document.getElementById("chat-btn");
const chatBox = document.getElementById("chat-box");

if (chatBtn && chatBox) {

    chatBtn.addEventListener("click", () => {

        if (chatBox.style.display === "flex") {
            chatBox.style.display = "none";
        } else {
            chatBox.style.display = "flex";
        }

    });

}
// =========================
// SEND MESSAGE
// =========================

const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBody = document.getElementById("chat-body");

if (sendBtn && userInput && chatBody) {

    sendBtn.addEventListener("click", sendMessage);

    userInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {

        const message = userInput.value.trim();

        if (message === "") return;

        // User Message
        chatBody.innerHTML += `
            <div class="user-msg">
                ${message}
            </div>
        `;

        userInput.value = "";

        // Flask API
        fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {

            chatBody.innerHTML += `
                <div class="bot-msg">
                    ${data.reply}
                </div>
            `;

            chatBody.scrollTop = chatBody.scrollHeight;

        });

    }

}