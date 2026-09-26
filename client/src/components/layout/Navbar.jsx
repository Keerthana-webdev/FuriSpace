import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

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

  const { user, isLoggedIn, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener("scroll", handleScroll);

    window.addEventListener(
      "cartUpdated",
      handleCartUpdate
    );

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

  const handleLogout = () => {
    logout();

    setMenuOpen(false);

    navigate("/");
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* LOGO */}
      <div className="logo">
        <Link to="/">FurniSpace</Link>
      </div>

      {/* NAVIGATION LINKS */}
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

      {/* SEARCH */}
      <div className="search-box">
        <FiSearch />

        <input
          type="text"
          placeholder="Search furniture..."
        />
      </div>

      {/* ICONS */}
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
        {isLoggedIn ? (
          <>
            {/* PROFILE */}
            <Link
              to="/profile"
              title={user?.name || "Profile"}
              onClick={() => setMenuOpen(false)}
            >
              <FiUser />
            </Link>

            {/* LOGOUT */}
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
              title="Logout"
            >
              <FiLogOut />
            </button>
          </>
        ) : (
          /* LOGIN */
          <Link
            to="/login"
            title="Login"
            onClick={() => setMenuOpen(false)}
          >
            <FiUser />
          </Link>
        )}

      </div>

      {/* MOBILE MENU */}
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