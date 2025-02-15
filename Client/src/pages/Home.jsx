import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import Chatbot from "../components/Chatbot";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const categories = ["Dairy", "Fruits", "Grains", "Livestock", "Vegetables"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/products?search=${searchQuery}&category=${selectedCategory}&page=${page}&limit=50`
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategory, page]); 

  const addToCart = (item, quantity) => {
    const totalPrice = item.price * quantity;
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].totalPrice += totalPrice;
    } else {
      updatedCart.push({ ...item, quantity, totalPrice });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category); 
    setPage(1); 
  };

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Banner products={products} />

     
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <Chatbot cart={cart} setCart={setCart} />

      <div className="home-container">
        <h2>Groceries</h2>
        {loading ? (
          <div className="loading">
            <p>Loading Products...</p>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="products">
            {products.map((product) => (
              <ProductCard key={product.id} item={product} onAddToCart={addToCart} />
            ))}
          </div>
        )}

        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Home;
