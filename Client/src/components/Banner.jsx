import React, { useState } from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);


  const handleAddToCart = () => {
    if (quantity <= 0) return;
    onAddToCart(item, quantity);
  };


  const totalPrice = (item) => (item.price * quantity).toFixed(2);

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
        <p className="total-price">Total: Rs. {totalPrice(item)}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const Banner = ({ products }) => {
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();


  const handleAddToCart = (item, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex >= 0) {

      cart[itemIndex].quantity += quantity;
      cart[itemIndex].totalPrice = cart[itemIndex].quantity * item.price;
    } else {
   
      cart.push({ ...item, quantity, totalPrice: quantity * item.price });
    }


    localStorage.setItem("cart", JSON.stringify(cart));
    setShowConfirmationModal(true); 
    setShowProductModal(false);
  };

  const handleShowProductModal = (item) => {
    setSelectedProduct(item); 
    setShowProductModal(true); 
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false); 
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false); 
  };

  return (
    <div className="banner-container">
      <h2 className="banner-title">Latest Products</h2>
      <div className="banner">
        {products.slice(0, 5).map((item, index) => (
          <div key={index} className="banner-item">
            <p>{item.productname} - Rs. {item.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => handleShowProductModal(item)} 
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

  
      {showProductModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <ProductCard
              item={selectedProduct}
              onAddToCart={handleAddToCart} 
              onClose={handleCloseProductModal}
            />
          </div>
        </div>
      )}

    
      {showConfirmationModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Item Added to Cart</h3>
            <p>The item has been added to your cart.</p>
            <div className="modal-buttons">
              <button onClick={handleCloseConfirmationModal}>Continue Shopping</button>
              <button onClick={() => navigate('/cart')}>Go to Cart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
