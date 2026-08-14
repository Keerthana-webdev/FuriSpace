import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  // Product image
  const image =
    product.images?.[0]?.url || product.images?.[0] || "/placeholder.jpg";

  // Product price
  const price = Number(product.price || 0);

  // Discount
  const discount = Number(product.discount || 0);

  // Rating
  const rating = Number(product.rating || 0);

  // Open product details page
  const openProductDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-card">
      {/* ==============================
          DISCOUNT
      ============================== */}

      {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}

      {/* ==============================
          WISHLIST
      ============================== */}

      <button
        className="wishlist-btn"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Wishlist:", product._id);
        }}
      >
        <FiHeart />
      </button>

      {/* ==============================
          PRODUCT IMAGE
      ============================== */}

      <div
        className="product-card-image"
        onClick={openProductDetails}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openProductDetails();
          }
        }}
      >
        <img src={image} alt={product.name || "Furniture"} />
      </div>

      {/* ==============================
          PRODUCT INFORMATION
      ============================== */}

      <div className="product-card-content">
        {/* PRODUCT NAME */}

        <h3 onClick={openProductDetails} className="product-name-clickable">
          {product.name}
        </h3>

        {/* ==============================
            RATING
        ============================== */}

        <div className="rating">
          {"★".repeat(Math.min(5, Math.max(0, Math.round(rating))))}

          <span>{rating > 0 ? ` ${rating}` : " No rating"}</span>
        </div>

        {/* ==============================
            PRICE
        ============================== */}

        <p className="price">₹{price.toLocaleString("en-IN")}</p>

        {/* ==============================
            BUTTONS
        ============================== */}

        <div className="product-buttons">
          {/* QUICK VIEW */}

          <Link
            to={`/products/${product._id}`}
            className="view-btn"
            onClick={(e) => e.stopPropagation()}
          >
            <FiEye />
            Quick View
          </Link>

          {/* ADD TO CART */}

          <button
            className="cart-btn"
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              console.log("Add to cart:", product._id);
            }}
          >
            <FiShoppingCart />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
