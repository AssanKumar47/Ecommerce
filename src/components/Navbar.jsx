import React from "react";
import "./Navbar.css";
import { FaShoppingCart, FaUser, FaHome, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <input type="text" placeholder="Search for products..." className="search-bar" />
      </div>

      <div className="center">
        <h1 className="logo">ShopLogo</h1>
      </div>

      <div className="right">
        <Link to='/home'><FaHome /> Home</Link>
        <Link to='/cart'><FaShoppingCart /> Cart</Link>
        <Link to='/chatbot'><FaRobot /> Chatbot</Link>
        <Link to='/profile'><FaUser /> Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
