import React, { useState } from 'react';
import './index.css';

const CustomChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = async () => {

  if (inputMessage.trim().toLowerCase() === 'clear') {

      setMessages([]);
      setInputMessage('');
      return;
    }
    if (!inputMessage.trim()) return;


    const newMessages = [...messages, { text: inputMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputMessage('');

    try {

      const response = await fetch('http://localhost:5001/api/admin/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage })
      });

      const data = await response.json();

      setMessages(prevMessages => [
        ...prevMessages,
        { text: data.reply, sender: 'bot' }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Sorry, something went wrong.', sender: 'bot' }
      ]);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">

      <button
        onClick={toggleChatbot}
        className="chatbot-toggle-btn"
      >
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>

      {isOpen && (
        <div className="chatbot-window">

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={msg}
                className={`message ${
                  msg.sender === 'user'
                    ? 'user-message'
                    : 'bot-message'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>


          <div className="chatbot-input-area">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chatbot-input"
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="chatbot-send-btn"
            >
              Send
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default CustomChatbot;