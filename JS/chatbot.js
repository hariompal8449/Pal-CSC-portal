// Global Mute State
let isMuted = false;

// 1. Mute / Unmute Toggle Function
window.toggleMute = function() {
    isMuted = !isMuted;
    const muteIcon = document.getElementById('mute-icon');
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }

    if (muteIcon) {
        if (isMuted) {
            muteIcon.className = "fa-solid fa-volume-xmark";
        } else {
            muteIcon.className = "fa-solid fa-volume-high";
        }
    }
};

// 2. Text to Speech Function (English - en-US)
function speakText(textToSpeak) {
    if (isMuted) return;

    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    }
};

// 3. Chatbot Open / Close Function
window.toggleChatbot = function() {
    const chatbotWindow = document.getElementById('chatbot-window');
    if (chatbotWindow) {
        const currentDisplay = window.getComputedStyle(chatbotWindow).display;
        const isOpen = currentDisplay === 'flex' || currentDisplay === 'block';
        
        chatbotWindow.style.display = isOpen ? 'none' : 'flex';

        if (isOpen) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        } else {
            const chatBody = document.getElementById('chat-body');
            if (chatBody && chatBody.children.length === 1) {
                speakText("Hello! I am your CSC AI Assistant. Type any service name to get its direct link.");
            }
            const inputField = document.getElementById('user-input');
            if (inputField) inputField.focus();
        }
    }
};

window.handleKeyPress = function(event) {
    if (event.key === 'Enter') {
        window.sendMessage();
    }
};

// 4. Universal Auto-Scan Website Search & Link Generator
window.sendMessage = function() {
    const inputField = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-body');
    if (!inputField || !chatBody) return;

    const userText = inputField.value.trim();
    if (userText === '') return;

    // Display User Message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'user-msg';
    userMsgDiv.style.textAlign = 'right';
    userMsgDiv.style.margin = '8px 0';
    userMsgDiv.innerHTML = `<span style="background: #2563eb; color: #fff; padding: 8px 12px; border-radius: 8px; display: inline-block;">${userText}</span>`;
    chatBody.appendChild(userMsgDiv);

    inputField.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show Typing Indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-msg';
    typingDiv.id = 'typing-indicator';
    typingDiv.style.margin = '8px 0';
    typingDiv.innerHTML = `<span style="background: #e2e8f0; color: #64748b; padding: 8px 12px; border-radius: 8px; display: inline-block; font-style: italic;">Searching portal services...</span>`;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        // Remove Typing Indicator
        const typingElem = document.getElementById('typing-indicator');
        if (typingElem) {
            typingElem.remove();
        }

        let botReply = "";
        let speechReply = "";
        const lowerText = userText.toLowerCase();

        // Specific Detailed Document Checklists for Major Services
        if (lowerText.includes('aadhaar') || lowerText.includes('आधार')) {
            botReply = `<b>Aadhaar Card Services & Documents:</b><br><br>
            Required documents for new enrollment or update:<br>
            1. <b>Identity Proof:</b> Voter ID, PAN Card, or Passport<br>
            2. <b>Address Proof:</b> Electricity Bill, Ration Card, or Bank Passbook<br>
            3. <b>DOB Proof:</b> Birth Certificate or 10th Marksheet<br><br>
            <a href="./pages/aadhaar.html" target="_self" style="background: #0284c7; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; display: inline-block; cursor: pointer;">🔗 Open Aadhaar Page</a>`;
            speechReply = "Here are the details and link for Aadhaar card services.";
        } 
        else if (lowerText.includes('pan') || lowerText.includes('पैन')) {
            botReply = `<b>PAN Card Services & Documents:</b><br><br>
            Required documents for new PAN Card (Form 49A):<br>
            1. <b>Identity Proof:</b> Aadhaar Card or Voter ID<br>
            2. <b>Address Proof:</b> Aadhaar Card or Driving Licence<br>
            3. <b>DOB Proof:</b> Birth Certificate<br><br>
            <a href="./pages/pan.html" target="_self" style="background: #0284c7; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; display: inline-block; cursor: pointer;">🔗 Open PAN Page</a>`;
            speechReply = "Here are the details and link for PAN card services.";
        } 
        else if (lowerText.includes('voter') || lowerText.includes('वोटर')) {
            botReply = `<b>Voter ID Card Services & Documents:</b><br><br>
            Required documents for Voter ID (Form 6):<br>
            1. <b>Passport Size Photo</b><br>
            2. <b>Age Proof:</b> Birth Certificate or School Certificate<br>
            3. <b>Address Proof:</b> Aadhaar Card or Bank Passbook<br><br>
            <a href="./pages/voter.html" target="_self" style="background: #0284c7; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; display: inline-block; cursor: pointer;">🔗 Open Voter Page</a>`;
            speechReply = "Here are the details and link for Voter ID card services.";
        }
        else {
            // DYNAMIC AUTO-SCAN: Website par bane sabhi service cards ko scan karega
            let foundMatch = false;
            const cards = document.querySelectorAll('.card'); // Aapki website ke saare service cards
            
            cards.forEach(card => {
                const cardText = card.innerText.toLowerCase();
                if (!foundMatch && cardText.includes(lowerText)) {
                    foundMatch = true;
                    // Card ke andar ka title aur button/link nikalna
                    const titleElem = card.querySelector('h3') || card.querySelector('h4') || card;
                    const linkElem = card.querySelector('a');
                    const titleText = titleElem ? titleElem.innerText.split('\n')[0] : "Service Details";
                    const linkHref = linkElem ? linkElem.getAttribute('href') : "./index.html";

                    botReply = `<b>Service Found: ${titleText}</b><br><br>
                    Here is the service information and direct link from your portal.<br><br>
                    <a href="${linkHref}" target="_self" style="background: #0284c7; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; display: inline-block; cursor: pointer;">🔗 Open ${titleText}</a>`;
                    speechReply = `I found the service ${titleText} for you.`;
                }
            });

            if (!foundMatch) {
                botReply = `Sorry, no service found matching "<b>${userText}</b>". Please check our homepage for the complete services list.<br><br><a href="./index.html" target="_self" style="background: #0284c7; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; display: inline-block; cursor: pointer;">🔗 Go to Home Page</a>`;
                speechReply = "Sorry, no matching service found on the portal.";
            }
        }

        // Display Bot Reply
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'bot-msg';
        botMsgDiv.style.margin = '8px 0';
        botMsgDiv.innerHTML = `<span style="background: #e2e8f0; color: #1e293b; padding: 8px 12px; border-radius: 8px; display: block;">${botReply}</span>`;
        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        speakText(speechReply);
    }, 1000);
};

window.startVoiceRecognition = function() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            document.getElementById('user-input').value = speechResult;
            window.sendMessage();
        };

        recognition.start();
    } else {
        alert("Your browser does not support voice search.");
    }
};