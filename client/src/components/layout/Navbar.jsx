import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // CART COUNT
  const [cartCount, setCartCount] = useState(0);

  // LOAD CART COUNT
  const loadCartCount = () => {
    try {
      // IMPORTANT:
      // Your cart data is stored in "cartItems"
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Add all product quantities
      const count = savedCart.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0,
      );

      setCartCount(count);
    } catch (error) {
      console.error("Error loading cart count:", error);

      setCartCount(0);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    loadCartCount();

    window.addEventListener("cartUpdated", loadCartCount);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("cartUpdated", loadCartCount);
    };
  }, []);

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="logo">
        <Link to="/">FurniSpace</Link>
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
        </li>

        <li>
          <Link to="#" onClick={() => setMenuOpen(false)}>
            About
          </Link>
        </li>

        <li>
          <Link to="#" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </li>
      </ul>

      <div className="search-box">
        <FiSearch />

        <input type="text" placeholder="Search furniture..." />
      </div>

      <div className="icons">
        {/* CART */}
        <Link to="/cart" className="cart-icon">
          <FiShoppingCart />

          {/* CART NUMBER */}
          <span>{cartCount}</span>
        </Link>

        {/* USER */}
        <Link to="/login">
          <FiUser />
        </Link>
      </div>

      <div className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>
    </motion.nav>
  );
}

export default Navbar;
