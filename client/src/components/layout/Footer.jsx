import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
} from "react-icons/fi";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company */}

        <div className="footer-section">
          <h2 className="footer-logo">FurniSpace</h2>

          <p>
            Premium furniture crafted for modern homes with style, comfort, and quality.
          </p>
        </div>

        {/* Quick Links */}

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="#">About</Link>
          <Link to="#">Contact</Link>
        </div>

        {/* Support */}

        <div className="footer-section">
          <h3>Support</h3>
          <Link to="#">Shipping</Link>
          <Link to="#">Returns</Link>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms & Conditions</Link>
        </div>

        {/* Contact */}

        <div className="footer-section">
          <h3>Contact</h3>

          <p>
            <FiMapPin /> Bangalore, India
          </p>

          <p>
            <FiPhone /> +91 9876543210
          </p>

          <p>
            <FiMail /> support@furnispace.com
          </p>
        </div>

        {/* Newsletter */}

        <div className="footer-section">
          <h3>Newsletter</h3>

          <p>Subscribe to receive our latest offers.</p>

          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />

            <button>
              <FiSend />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#">
            <FiFacebook />
          </a>

          <a href="#">
            <FiInstagram />
          </a>

          <a href="#">
            <FiTwitter />
          </a>

          <a href="#">
            <FiLinkedin />
          </a>
        </div>

        <p>© 2026 FurniSpace. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
