import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";
import heroImage from "../../assets/images/hero-sofa.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="hero-tag">✨ Premium Furniture Collection</span>

          <h1>
            Designed for
            <span> Modern Living</span>
          </h1>

          <p>
            Experience luxury furniture crafted for comfort, elegance and
            timeless beauty. Discover premium collections for every room in your
            home.
          </p>

          <div className="hero-buttons">
            <Link to="/products" className="btn-primary">
              Shop Now
            </Link>

            <Link to="/products" className="btn-secondary">
              Explore Collection
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h2>500+</h2>
              <p>Products</p>
            </div>

            <div>
              <h2>10K+</h2>
              <p>Customers</p>
            </div>

            <div>
              <h2>24/7</h2>
              <p>Support</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={heroImage} alt="Luxury Sofa" />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
