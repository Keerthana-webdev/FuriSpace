import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiSearch,
} from "react-icons/fi";

import "./Navbar.css";

const getCartCount = () => {
  try {
    const savedCart =
      JSON.parse(localStorage.getItem("cartItems")) || [];

    return savedCart.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0
    );
  } catch (error) {
    console.error("Error loading cart count:", error);

    return 0;
  }
};

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(getCartCount);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Add cart listener
    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );
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

      <ul
        className={
          menuOpen
            ? "nav-links active"
            : "nav-links"
        }
      >
        <li>
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
        </li>

        <li>
          <Link
            to="#"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
        </li>

        <li>
          <Link
            to="#"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="search-box">
        <FiSearch />

        <input
          type="text"
          placeholder="Search furniture..."
        />
      </div>

      <div className="icons">

        {/* CART */}
        <Link
          to="/cart"
          className="cart-icon"
        >
          <FiShoppingCart />

          <span>{cartCount}</span>
        </Link>

        {/* USER */}
        <Link to="/login">
          <FiUser />
        </Link>

      </div>

      <div
        className="mobile-menu"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? (
          <FiX />
        ) : (
          <FiMenu />
        )}
      </div>
    </motion.nav>
  );
}

export default Navbar;