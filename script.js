const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
let aiResponse=true;

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "5 Core";
const PERSON_NAME = "Customer";
const socket = new WebSocket('wss://4bwcngjbd2.execute-api.us-east-1.amazonaws.com/Prod');

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    console.log(message)
    appendMessage(BOT_NAME, BOT_IMG, "left", message.message); // Display the server's response
    aiResponse=true;
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
          thread_id: "thread_BwzzihilIMGgMQPJR7pFDD9O"
      }
  };
  if(aiResponse){
    console.log("sending mesage to the websocket")
    socket.send(JSON.stringify(messageData));

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";

    aiResponse=false;
    // var messageBtn=document.getElementById("msgBtn");
    // messageBtn.disabled=true;
  }



  
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
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
  msgerChat.scrollTop += 500;
}

function toggleChatbox() {
    var chatbox = document.getElementById("chatbox");
    if (chatbox.style.display === "none" || chatbox.style.display === "") {
        chatbox.style.display = "flex";  // Show the chatbox
    } else {
        chatbox.style.display = "none";   // Hide the chatbox
    }
}
function toggleChatIcon() {
    console.log("its clicked")
    var chatbox = document.getElementById("chat-icon");
    var chatboxbody=document.getElementById("chat-box")
    chatboxbody.style.display="flex"
    chatbox.style.display="none";
}

function closeChat(){
    var chatbox=document.getElementById("chat-box")
    chatbox.style.display="none"
    var chaticon=document.getElementById("chat-icon")
    chaticon.style.display="block"
}


// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
