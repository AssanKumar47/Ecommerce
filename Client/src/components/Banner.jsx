import React, { useState } from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";

// ProductCard Component to show the product details in the modal
const ProductCard = ({ item, onAddToCart, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  // Handle adding to cart
  const handleAddToCart = () => {
    if (quantity <= 0) return;
    onAddToCart(item, quantity);
  };

  // Calculate the total price based on the quantity
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
  const [showProductModal, setShowProductModal] = useState(false); // Modal visibility state
  const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for confirmation modal
  const navigate = useNavigate();

  // Add item to cart and save to localStorage
  const handleAddToCart = (item, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (itemIndex >= 0) {
      // Item already in cart, update quantity
      cart[itemIndex].quantity += quantity;
      cart[itemIndex].totalPrice = cart[itemIndex].quantity * item.price;
    } else {
      // Item not in cart, add new item
      cart.push({ ...item, quantity, totalPrice: quantity * item.price });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowConfirmationModal(true); // Show the confirmation modal
    setShowProductModal(false); // Close product modal
  };

  const handleShowProductModal = (item) => {
    setSelectedProduct(item); // Set the selected product for the modal
    setShowProductModal(true); // Show the modal
  };

  const handleCloseProductModal = () => {
    setShowProductModal(false); // Close the modal
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false); // Close confirmation modal
  };

  return (
    <div className="banner-container">
      <h2 className="banner-title">Latest Discount</h2>
      <div className="banner">
        {products.slice(0, 5).map((item, index) => (
          <div key={index} className="banner-item">
            <p>{item.productname} - Rs. {item.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => handleShowProductModal(item)} // Show product details on click
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Modal for showing the ProductCard */}
      {showProductModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <ProductCard
              item={selectedProduct}
              onAddToCart={handleAddToCart} // Add to cart and show confirmation
              onClose={handleCloseProductModal} // Close modal handler
            />
          </div>
        </div>
      )}

      {/* Confirmation Modal for added item */}
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
