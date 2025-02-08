import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // Track the current page
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  // Fetch products from the API based on search query and pagination
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/products?search=${searchQuery}&page=${page}&limit=50`
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
  }, [searchQuery, page]); // Triggered whenever the searchQuery or page changes

  // Add item to the cart
  const addToCart = (item, quantity) => {
    const totalPrice = item.price * quantity;
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If item already in the cart, just update the quantity
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].totalPrice += totalPrice;
    } else {
      // Otherwise, add a new item to the cart
      updatedCart.push({ ...item, quantity, totalPrice });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    const totalPrice = updatedCart[index].price * quantity;
    updatedCart[index].quantity = quantity;
    updatedCart[index].totalPrice = totalPrice;

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <Banner products={products} />
      <div className="home-container">
        <h2>Groceries</h2>
        {loading ? (
          <div className="loading">
            <p>Loading Vegetables...</p>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="products">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                item={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>Page {page}</span>
          <button onClick={() => handlePageChange(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
