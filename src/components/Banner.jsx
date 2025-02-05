import React, { useState } from "react";
import CartModal from "./CartModal";
import "./Banner.css";

const discountVegetables = [
  { id: 1, image: "https://www.hhs1.com/hubfs/carrots%20on%20wood-1.jpg", name: "Carrot", price: 23.99 },
  { id: 2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlmL97RKKfkTOZD4xSIPMS8htf-6B1hxOjnA&s", name: "Spinach", price: 12.99 },
  { id: 3, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ONLsNmWg9fNMjVgTpRVlv7PMUjNTtCYXKw&s", name: "Corn", price: 31.49 },
  { id: 4, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoWG_3fIkBuFSBbXn2rn7ntnIqUO3yUom6A&s", name: "Cucumber", price: 19.49 },
];

const Banner = ({ onAddToCart }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="banner-container">
      <h2 className="banner-title">Latest on Discount</h2>
      <div className="banner">
        {discountVegetables.map((item) => (
          <div key={item.id} className="banner-item">
            <img src={item.image} alt={item.name} className="banner-image" />
            <p>{item.name} - Rs. {item.price.toFixed(2)}</p>
            <button className="banner-btn" onClick={() => setSelectedItem(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <CartModal item={selectedItem} onClose={() => setSelectedItem(null)} onAddToCart={onAddToCart} />
      )}
    </div>
  );
};

export default Banner;
