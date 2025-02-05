import React, { useState } from "react";
import "./CartModal.css";

const CartModal = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = item.price * quantity; // Calculate price based on base price per kg

  const handleAddToCart = () => {
    onAddToCart(item, quantity, totalPrice);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add {item.name} to Cart</h3>
        <img src={item.image} alt={item.name} className="modal-image" />
        <p>Price per Kg: Rs. {item.price}</p>
        <p>Total Price: Rs. {totalPrice.toFixed(2)}</p>
        <div className="quantity-controls">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <span>{quantity} kg</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CartModal;
 