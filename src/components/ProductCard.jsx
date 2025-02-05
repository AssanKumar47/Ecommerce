import React, { useState } from "react";
import CartModal from "./CartModal";
import "./ProductCard.css";

const ProductCard = ({ item, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="product-card">
      <img src={item.image} alt={item.name} className="product-image" />
      <h3>{item.name}</h3>
      <p>Rs. {item.price.toFixed(2)}</p>
      <button onClick={() => setShowModal(true)}>Add to Cart</button>

      {showModal && (
        <CartModal item={item} onClose={() => setShowModal(false)} onAddToCart={onAddToCart} />
      )}
    </div>
  );
};

export default ProductCard;
