import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
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
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>

        <li>
          <Link to="#">About</Link>
        </li>

        <li>
          <Link to="#">Contact</Link>
        </li>
      </ul>

      <div className="search-box">
        <FiSearch />

        <input type="text" placeholder="Search furniture..." />
      </div>

      <div className="icons">
        <Link to="/cart" className="cart-icon">
          <FiShoppingCart />
          <span>0</span>
        </Link>

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
