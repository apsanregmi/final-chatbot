<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatbot UI</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="chat-icon" id="chat-icon" onclick="toggleChatIcon()">
        <i class="fas fa-comments">💁‍♂️</i>
    </div>
    <section class="msger" id="chat-box" style="display: none">
        <!-- <header class="msger-header">
            <div class="msger-header-title">
                <img src="https://5core.com/cdn/shop/files/LOGO_3_RED_LOGO_434503c0-3697-4c30-8728-1dfc9d9de8d5_185x@2x.png?v=1728161307" alt="Logo" />
                <span>5 Core GavieAI Support</span>
            </div>
            <div class="msger-header-options" onclick="closeChat()">
                <i class="fas fa-times"></i>
            </div>
        </header> -->


        <header class="msger-header">
          <div class="msger-header-title">
              <img src="https://5core.com/cdn/shop/files/LOGO_3_RED_LOGO_434503c0-3697-4c30-8728-1dfc9d9de8d5_185x@2x.png?v=1728161307" alt="Logo" />
              <span>5 Core GavieAI Support</span>
          </div>
          <div class="msger-header-options">
              <!-- <i class="fas fa-window-minimize" onclick="minimizeChat()">__</i> -->
              <i class="fas fa-times" onclick="closeChat()">➖ </i>
          </div>
      </header>
        <main class="msger-chat">
            <div class="msg left-msg">
                <div class="msg-img" style="background-image: url(https://5core.com/cdn/shop/files/LOGO_3_RED_LOGO_434503c0-3697-4c30-8728-1dfc9d9de8d5_185x@2x.png?v=1728161307);"></div>
                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">5 Core</div>
                        <!-- <div class="msg-info-time">${formatDate(new Date())}</div> -->
                    </div>
                    <div class="msg-text">Hi, welcome to 5 Core. Feel free to ask 😄</div>
                </div>
            </div>
        </main>
        <div class="typing-indicator" style="display: none;">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <div id="msger-chat" class="chat-window"></div>
        <div id="typing-indicator" class="typing-indicator">Gavie AI is typing...</div>
        <form id="msger-form" class="input-area">
            <input type="text" class="msger-input" placeholder="Type your message...">
            <button type="submit" class="msger-send-btn">Send</button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>
