const msgerForm = document.getElementById("msger-form");
const msgerInput = msgerForm.querySelector(".msger-input");
const msgerChat = document.getElementById("msger-chat");
const sendButton = msgerForm.querySelector(".msger-send-btn");

const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "Gavie AI";
const PERSON_NAME = "Customer";

const socket = new WebSocket('wss://4bwcngjbd2.execute-api.us-east-1.amazonaws.com/Prod');
let threadid = null;
const typingIndicator = document.getElementById("typing-indicator");
let aiResponse = true;

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    threadid = message.thread_id;

    typingIndicator.style.display = "none";  // Hide typing indicator
    sendButton.disabled = false;  // Re-enable the send button

    appendMessage(BOT_NAME, BOT_IMG, "left", message.message);
    aiResponse = true;
};

msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    const messageData = {
        action: "sendmessage",
        data: {
            question: msgText,
            assistant_id: "asst_XAItd5TbGX3hrKAthaD2oTpp",
            thread_id: threadid
        }
    };
    
    if (aiResponse) {
        socket.send(JSON.stringify(messageData));
        appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
        msgerInput.value = "";

        typingIndicator.style.display = "block";  // Show typing indicator
        sendButton.disabled = true;  // Disable send button while bot is typing

        aiResponse = false;
    }
});

function appendMessage(name, img, side, text) {
    const msgHTML = `
        <div class="msg ${side}-msg">
            <div class="msg-img" style="background-image: url(${img})"></div>
            <div class="msg-bubble">
                <div class="msg-info">
                    <div class="msg-info-name">${name}</div>
                    <div class="msg-info-time">${formatDate(new Date())}</div>
                </div>
                <div class="msg-text">${text}</div>
            </div>
        </div>
    `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop = msgerChat.scrollHeight;
}

function toggleChatIcon() {
    document.getElementById("chat-box").style.display = "flex";
    document.getElementById("chat-icon").style.display = "none";
}

function closeChat() {
    document.getElementById("chat-box").style.display = "none";
    document.getElementById("chat-icon").style.display = "block";
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}
