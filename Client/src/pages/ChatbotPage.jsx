import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./ChatbotPage.css";
import axios from "axios";
import products from "./Home"; 
import discountVegetables from "../components/Banner"; 

const ChatbotPage = () => {
  const [messages, setMessages] = useState([{ text: "Hello! How can I assist you today?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
        cart,
        bannerItems: discountVegetables,
        homeProducts: products,
      });

      setMessages((prev) => [...prev, { text: response.data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Error connecting to chatbot.", sender: "bot" }]);
    }

    setInput("");
  };

  return (
    <>
      <Navbar />
      <div className="chatbot-page">
        <div className="chat-container">
          <div className="chat-header">Chatbot</div>
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
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotPage;
