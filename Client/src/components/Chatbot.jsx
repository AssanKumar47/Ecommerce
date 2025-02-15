import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Make sure you have a proper CSS file for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent empty messages

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/chatbot", { message: input });
      const botReply = response.data.reply || "Sorry, I didn't understand that.";

      setMessages([...newMessages, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([...newMessages, { text: "Error connecting to chatbot.", sender: "bot" }]);
    }
  };

  return (
    <div className="chat-container">
      <button className="chat-toggle" onClick={() => setShowChat(!showChat)}>
        💬 Chat
      </button>

      {showChat && (
        <div className="chat-box">
          <div className="chat-header">
            <h4>Chat with us</h4>
            <button className="close-btn" onClick={() => setShowChat(false)}>✖</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
