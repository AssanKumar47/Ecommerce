import React from "react";
import "./CartItem.css";

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.productname} />
      </div>
      <div className="item-details">
        <h3>{item.productname}</h3>
        <p className="price">Rs. {item.price} / Kg</p>
        <div className="quantity-controls">
          <button onClick={() => onUpdateQuantity(item, item.quantity - 1)}>-</button>
          <span>{item.quantity} Kg</span>
          <button onClick={() => onUpdateQuantity(item, item.quantity + 1)}>+</button>
        </div>
        <p className="total-price">Total: Rs. {item.totalPrice.toFixed(2)}</p>
      </div>
      <button className="remove-btn" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
