import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";

import { Link } from "react-router-dom";

import "./ProductCard.css";

function ProductCard({ product }) {
  const image = product.images?.[0] || "/placeholder.jpg";

  const price = Number(product.price || 0);

  const discount = Number(product.discount || 0);

  const rating = Number(product.rating || 0);

  return (
    <div className="product-card">
      {/* DISCOUNT */}

      {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}

      {/* WISHLIST */}

      <button className="wishlist-btn" type="button">
        <FiHeart />
      </button>

      {/* PRODUCT IMAGE */}

      <img src={image} alt={product.name || "Furniture"} />

      {/* PRODUCT INFORMATION */}

      <div className="product-card-content">
        <h3>{product.name}</h3>

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

          <button className="cart-btn" type="button">
            <FiShoppingCart />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
