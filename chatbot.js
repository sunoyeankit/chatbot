// Replace with your OpenAI API key
const OPENAI_API_KEY = 'your-api-key-here';

async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput.trim()) return;  // Ignore empty input

  // Display user's message in the chatbox
  displayMessage(userInput, 'user');
  document.getElementById("user-input").value = ""; // Clear input

  // Send the message to OpenAI's API and get a response
  const response = await getBotResponse(userInput);
  displayMessage(response, 'bot');
}

function displayMessage(message, sender) {
  const messagesContainer = document.getElementById("messages");
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = `${sender === 'user' ? 'You' : 'Bot'}: ${message}`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto scroll
}

async function getBotResponse(userInput) {
  const url = 'https://api.openai.com/v1/chat/completions';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4',  // Ensure you have access to GPT-4 model
        messages: [{ role: 'user', content: userInput }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;  // Get the bot's response
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I couldn't process your request.";
  }
}
