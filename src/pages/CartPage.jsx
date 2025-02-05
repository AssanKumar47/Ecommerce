import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import "./CartPage.css";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity <= 0) return;

    const updatedCart = cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: newQuantity, totalPrice: newQuantity * cartItem.price }
        : cartItem
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
  <>
      <Navbar />
    <div className="cart-page">
      <div className="cart-layout">
        <div className="cart-items-section">
          <h2>Your Shopping Cart</h2>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty. Start adding some items!</p>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
          )}
        </div>
        <div className="order-summary-section">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <p>Subtotal ({cart.length} items): <span>Rs. {totalPrice.toFixed(2)}</span></p>
            <p>Shipping: <span>Rs. 0.00</span></p>
            <p>Total: <span>Rs. {totalPrice.toFixed(2)}</span></p>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default CartPage;