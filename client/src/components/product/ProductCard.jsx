import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const image =
    product.images?.[0]?.url || product.images?.[0] || "/placeholder.jpg";

  const price = Number(product.price || 0);

  const discount = Number(product.discount || 0);

  const rating = Number(product.rating || 0);

  // ADD PRODUCT TO CART
  const handleAddToCart = () => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];

      const existingItem = existingCart.find(
        (item) => item._id === product._id,
      );

      let updatedCart;

      if (existingItem) {
        updatedCart = existingCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: Number(item.quantity || 1) + 1,
              }
            : item,
        );
      } else {
        updatedCart = [
          ...existingCart,
          {
            ...product,
            quantity: 1,
          },
        ];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      window.dispatchEvent(new Event("cartUpdated"));

      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);

      alert("Unable to add product to cart");
    }
  };

  return (
    <div className="product-card">
      {/* DISCOUNT */}
      {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}

      {/* WISHLIST */}
      <button className="wishlist-btn" type="button">
        <FiHeart />
      </button>

      {/* PRODUCT IMAGE */}
      <div
        className="product-card-image"
        onClick={() => navigate(`/products/${product._id}`)}
        style={{ cursor: "pointer" }}
      >
        <img src={image} alt={product.name || "Furniture"} />
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="product-card-content">
        <h3
          onClick={() => navigate(`/products/${product._id}`)}
          style={{ cursor: "pointer" }}
        >
          {product.name}
        </h3>

        {/* RATING */}
        <div className="rating">
          {"★".repeat(Math.min(5, Math.max(0, Math.round(rating))))}

          <span>{rating > 0 ? ` ${rating}` : " No rating"}</span>
        </div>

        {/* PRICE */}
        <p className="price">₹{price.toLocaleString("en-IN")}</p>

        {/* BUTTONS */}
        <div className="product-buttons">
          <Link to={`/products/${product._id}`} className="view-btn">
            <FiEye />
            Quick View
          </Link>

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
