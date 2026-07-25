import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company */}
        <div className="footer-section">
          <h2 className="footer-logo">FurniSpace</h2>

          <p>
            Premium furniture designed for modern homes. We combine comfort,
            elegance, and durability to make every space beautiful.
          </p>

          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />

            <button>Subscribe</button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          <Link to="#">About</Link>

          <Link to="#">Contact</Link>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3>Customer Support</h3>

          <Link to="/orders">My Orders</Link>

          <Link to="#">Shipping</Link>

          <Link to="#">Returns</Link>

          <Link to="#">Privacy Policy</Link>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>
            <FaMapMarkerAlt /> Bangalore, India
          </p>

          <p>
            <FaEnvelope /> support@furnispace.com
          </p>

          <p>
            <FaPhone /> +91 9876543210
          </p>

          <div className="social-icons">
            <a href="#">
              <FaFacebook />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 FurniSpace. All Rights Reserved. ❤️ Made in India.
      </div>
    </footer>
  );
}

export default Footer;
