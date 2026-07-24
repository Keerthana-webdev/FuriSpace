import "./Navbar.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { useState } from "react";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <motion.nav
            className="navbar"
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >

            <div className="logo">

                <Link to="/">
                    FurniSpace
                </Link>

            </div>

            <ul className={menuOpen ? "nav-links active" : "nav-links"}>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/products">Products</Link>
                </li>

                <li>
                    <Link to="/orders">Orders</Link>
                </li>
                
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>

            <div className="navbar-right">
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search furniture..."
                    />
                </div>

                <Link to="/cart" className="icon">
                    <FaShoppingCart />
                    <span className="cart-count">
                        0
                    </span>
                </Link>

                <Link to="/profile" className="icon">
                    <FaUserCircle />
                </Link>

                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
 {
                        menuOpen ?<FaTimes /> : <FaBars />
                    }
                </div>
            </div>
        </motion.nav>
    );
}

export default Navbar;