import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./ChatbotPage.css";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  
  const [cart, setCart] = useState([]);
  const [bannerItems, setBannerItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const storedBanner = JSON.parse(localStorage.getItem("bannerItems")) || [
      { name: "Carrot", price: 50 },
      { name: "Tomato", price: 40 },
      { name: "Potato", price: 30 },
    ];
    setBannerItems(storedBanner);
  }, []);

  const totalCartPrice = cart.reduce((acc, item) => acc + item.totalPrice, 0);


  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);


    let botResponse = "I'm not sure how to respond to that.";
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("cart")) {
      if (cart.length === 0) {
        botResponse = "Your cart is empty. Add some items to see them here!";
      } else {
        const cartItems = cart.map((item) => `${item.quantity}kg of ${item.name} (Rs. ${item.totalPrice})`).join(", ");
        botResponse = `Your cart contains: ${cartItems}. Total price: Rs. ${totalCartPrice}.`;
      }
    } else if (lowerInput.includes("banner") || lowerInput.includes("discount")) {
      const bannerList = bannerItems.map((item) => `${item.name} (Rs. ${item.price}/kg)`).join(", ");
      botResponse = `Currently on discount: ${bannerList}.`;
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      botResponse = "Hello! How can I help you today?";
    } else if (lowerInput.includes("thank")) {
      botResponse = "You're welcome! Let me know if you need anything else.";
    }

   
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 800);

    setInput("");
  };

  return (
      <>
      <Navbar />
    <div className="chatbot-page">
      <div className="chat-container">
        <div className="chat-header">E-Shop Chatbot</div>
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
