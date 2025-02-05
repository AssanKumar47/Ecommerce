import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const products = [
  {
    id: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQityZtaWBfXric2IBSSByJjfZdUzyyBnPVzw&s",
    name: "Tomato",
    price: 29.99,
  },
  {
    id: 2,
    image: "https://images.ctfassets.net/0dkgxhks0leg/RKiZ605RAV8kjDQnxFCWP/b03b8729817c90b29b88d536bfd37ac5/9-Unusual-Uses-For-Potatoes.jpg",
    name: "Potato",
    price: 39.99,
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWodsdZmCsLG7aCE5nIwxA9THdR7xw9Yi87g&s",
    name: "Brinjal",
    price: 49.99,
  },
];
const Home = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const addToCart = (item, quantity, totalPrice) => {
    const updatedCart = [...cart, { ...item, quantity, totalPrice }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${item.name} added to cart with ${quantity}kg for Rs. ${totalPrice.toFixed(2)}`);
  };

  return (
    <>
      <Navbar />
      <Banner onAddToCart={addToCart} />
      <div className="home-container">
        <h2>Shop</h2>
        <div className="products">
          {products.map((product) => (
            <ProductCard key={product.id} item={product} onAddToCart={addToCart} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
