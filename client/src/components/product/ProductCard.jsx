import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./ProductCard.css";

function ProductCard({ product }) {
  const image =
    product.images?.[0]?.url || product.images?.[0] || "/placeholder.jpg";

  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);
  const rating = Number(product.rating || 0);

  // ADD PRODUCT TO CART
  const handleAddToCart = () => {
    try {
      // Get existing cart
      const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      // Check if product already exists
      const existingProduct = existingCart.find(
        (item) => item._id === product._id,
      );

      let updatedCart;

      if (existingProduct) {
        // Increase quantity
        updatedCart = existingCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      } else {
        // Add new product
        updatedCart = [
          ...existingCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      // Save cart
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      // Tell other components that cart changed
      window.dispatchEvent(new Event("cartUpdated"));

      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="product-card">
      {/* DISCOUNT */}
      {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}

      {/* WISHLIST */}
      <button
        className="wishlist-btn"
        type="button"
        onClick={() => console.log("Wishlist:", product._id)}
      >
        <FiHeart />
      </button>

      {/* PRODUCT IMAGE */}
      <Link to={`/products/${product._id}`}>
        <img src={image} alt={product.name || "Furniture"} />
      </Link>

      {/* PRODUCT INFORMATION */}
      <div className="product-card-content">
        <Link
          to={`/products/${product._id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <h3>{product.name}</h3>
        </Link>

        {/* RATING */}
        <div className="rating">
          {"★".repeat(Math.min(5, Math.max(0, Math.round(rating))))}

          <span>{rating > 0 ? ` ${rating}` : " No rating"}</span>
        </div>

        {/* PRICE */}
        <p className="price">₹{price.toLocaleString("en-IN")}</p>

        {/* BUTTONS */}
        <div className="product-buttons">
          {/* QUICK VIEW */}
          <Link to={`/products/${product._id}`} className="view-btn">
            <FiEye />
            Quick View
          </Link>

          {/* ADD TO CART */}
          <button className="cart-btn" type="button" onClick={handleAddToCart}>
            <FiShoppingCart />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
