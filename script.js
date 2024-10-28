const msgerForm = document.getElementById("msger-form");
const msgerInput = msgerForm.querySelector(".msger-input");
const msgerChat = document.getElementById("msger-chat");
const sendButton = msgerForm.querySelector(".msger-send-btn");

const BOT_IMG = "https://5core.com/cdn/shop/files/LOGO_3_RED_LOGO_434503c0-3697-4c30-8728-1dfc9d9de8d5_185x@2x.png?v=1728161307"; // Bot avatar (header image)
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg"; // User avatar
const BOT_NAME = "Gavie AI"; // Bot name
const PERSON_NAME = "Customer"; // User name

const socket = new WebSocket('wss://4bwcngjbd2.execute-api.us-east-1.amazonaws.com/Prod');
let threadid = null;
const typingIndicator = document.getElementById("typing-indicator");
let aiResponse = true;


const cors = require('cors');
app.use(cors({
  origin: 'https://msnepal.myshopify.com' // Replace with your Shopify store URL
}));

// WebSocket message handler
socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    threadid = message.thread_id;

    appendMessage(BOT_NAME, BOT_IMG, "left", message.message); // Display bot message
    hideTypingIndicator(); // Hide typing indicator after message is received
    aiResponse = true; // Indicate the bot has responded
};

// Form submission handler
msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    const msgText = msgerInput.value.trim(); // Trim whitespace from input
    if (!msgText) return; // Exit if the input is empty

    const messageData = {
        action: "sendmessage",
        data: {
            question: msgText,
            assistant_id: "asst_XAItd5TbGX3hrKAthaD2oTpp",
            thread_id: threadid
        }
    };

    sendMessage(msgText, messageData); 
});


function sendMessage(msgText, messageData) {
    if (aiResponse) {
        appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText); // Display user message
        msgerInput.value = ""; 

        showTypingIndicator(); 
        socket.send(JSON.stringify(messageData)); 
        aiResponse = false; 
    msgerChat.scrollTop = msgerChat.scrollHeight; 

    }
}


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

// Utility functions
function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`; // Format time as HH:MM
}

// Typing indicator functions
function showTypingIndicator() {
    typingIndicator.style.display = "block"; 
    sendButton.disabled = true; 
}

function hideTypingIndicator() {
    typingIndicator.style.display = "none"; // Hide typing indicator
    sendButton.disabled = false; // Enable send button
}
