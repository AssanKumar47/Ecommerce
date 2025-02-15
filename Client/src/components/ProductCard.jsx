import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";


const ProductCard = ({ item, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate()

  const handleAddToCart = () => {
    if (quantity <= 0) return; 
    onAddToCart(item, quantity);
    setShowModal(true); 
  };

  
  const totalPrice = (item.price * quantity).toFixed(2);


  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={item.image} alt={item.productname} />
      </div>
      <div className="product-info">
        <h3>{item.productname}</h3>
        <p className="product-price">Rs. {item.price.toFixed(2)} / Kg</p>
        <div className="quantity-selector">
          <button onClick={() => setQuantity(quantity - 1)}>-</button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            className="quantity-input"
          />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <p className="total-price">Total: Rs. {totalPrice}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

     
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Item Added to Cart</h3>
            <p>{item.productname} has been added to your cart.</p>
            <div className="modal-buttons">
              <button onClick={closeModal}>Continue Shopping</button>
              <button onClick={() => navigate('/cart')}>Go to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
