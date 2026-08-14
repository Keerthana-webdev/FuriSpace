import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiZap,
  FiHeart,
} from "react-icons/fi";

import { getProductById } from "../../services/ProductService";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        setError("");

        const data = await getProductById(id);

        console.log("Product Details Response:", data);

        if (data.success) {
          setProduct(data.product);
        } else {
          setError(data.message || "Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);

        setError("Unable to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="details-spinner"></div>

        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-error">
        <h2>Product Not Found</h2>

        <p>{error || "This product does not exist."}</p>

        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );
  }

  // ==========================================
  // PRODUCT IMAGES
  // ==========================================

  const images =
    product.images && product.images.length > 0
      ? product.images

          .map((image) => {
            // If image is an object
            if (typeof image === "object" && image !== null) {
              return image.url || image.secure_url || "";
            }

            // If image is already a string
            if (typeof image === "string") {
              return image;
            }

            return "";
          })

          .filter(Boolean)
      : [];

  // ==========================================
  // FALLBACK IMAGE
  // ==========================================

  const finalImages = images.length > 0 ? images : ["/placeholder.jpg"];

  // ==========================================
  // CURRENT IMAGE
  // ==========================================

  const currentImage = finalImages[selectedImage] || finalImages[0];

  // ==========================================
  // PRICE / DISCOUNT
  // ==========================================

  const discount = Number(product.discount || 0);

  const price = Number(product.price || 0);

  const originalPrice = discount > 0 ? price / (1 - discount / 100) : price;

  // ==========================================
  // QUANTITY
  // ==========================================

  const increaseQuantity = () => {
    if (quantity < Number(product.stock || 1)) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = () => {
    console.log("Add to cart:", product._id, quantity);

    alert(`${product.name} added to cart`);
  };

  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = () => {
    console.log("Buy now:", product._id, quantity);

    alert("Proceeding to checkout");
  };

  // ==========================================
  // IMAGE ERROR HANDLER
  // ==========================================

  const handleImageError = (event) => {
    event.target.onerror = null;

    event.target.src = "/placeholder.jpg";
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="product-details-page">
      <div className="details-container">
        {/* ======================================
            BACK BUTTON
        ====================================== */}

        <button
          className="back-to-products"
          onClick={() => navigate("/products")}
        >
          <FiArrowLeft />

          <span>Back to Products</span>
        </button>

        {/* ======================================
            BREADCRUMB
        ====================================== */}

        <div className="product-breadcrumb">
          Home
          <span>/</span>
          Products
          <span>/</span>
          {product.category || "Furniture"}
          <span>/</span>
          <strong>{product.name}</strong>
        </div>

        {/* ======================================
            MAIN PRODUCT
        ====================================== */}

        <section className="product-details-main">
          {/* ====================================
              IMAGE SECTION
          ==================================== */}

          <div className="product-gallery">
            {/* THUMBNAILS */}

            <div className="thumbnail-list">
              {finalImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={
                    selectedImage === index ? "thumbnail active" : "thumbnail"
                  }
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}

            <div className="main-product-image">
              {/* DISCOUNT */}

              {discount > 0 && (
                <div className="discount-badge">{discount}% OFF</div>
              )}

              {/* PRODUCT IMAGE */}

              <img
                src={currentImage}
                alt={product.name}
                onError={handleImageError}
              />

              {/* WISHLIST */}

              <button
                type="button"
                className="image-wishlist"
                onClick={() => console.log("Wishlist:", product._id)}
              >
                <FiHeart />
              </button>
            </div>
          </div>

          {/* ====================================
              PRODUCT INFORMATION
          ==================================== */}

          <div className="product-information">
            {/* BRAND */}

            <p className="product-brand">{product.brand || "FurniSpace"}</p>

            {/* PRODUCT NAME */}

            <h1>{product.name}</h1>

            {/* RATING */}

            <div className="product-rating">
              <span className="stars">
                {"★".repeat(
                  Math.min(
                    5,

                    Math.max(
                      0,

                      Math.round(Number(product.rating || 0)),
                    ),
                  ),
                )}
              </span>

              <span>{product.rating ? product.rating : "No rating"}</span>
            </div>

            {/* PRICE */}

            <div className="product-price-section">
              <span className="current-price">
                ₹{price.toLocaleString("en-IN")}
              </span>

              {discount > 0 && (
                <>
                  <span className="original-price">
                    ₹{Math.round(originalPrice).toLocaleString("en-IN")}
                  </span>

                  <span className="save-text">Save {discount}%</span>
                </>
              )}
            </div>

            {/* DESCRIPTION */}

            <p className="product-description">
              {product.description ||
                "Beautifully designed furniture created to bring comfort, style and functionality to your home."}
            </p>

            {/* ==================================
                QUICK SPECIFICATIONS
            ================================== */}

            <div className="quick-specifications">
              <div className="quick-spec">
                <span>Material</span>

                <strong>{product.material || "Premium"}</strong>
              </div>

              <div className="quick-spec">
                <span>Color</span>

                <strong>{product.color || "Natural"}</strong>
              </div>

              <div className="quick-spec">
                <span>Brand</span>

                <strong>{product.brand || "FurniSpace"}</strong>
              </div>

              <div className="quick-spec">
                <span>Stock</span>

                <strong
                  className={
                    Number(product.stock) > 0 ? "in-stock" : "out-stock"
                  }
                >
                  {Number(product.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
                </strong>
              </div>
            </div>

            {/* ==================================
                QUANTITY
            ================================== */}

            <div className="quantity-section">
              <span>Quantity</span>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                >
                  <FiMinus />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= Number(product.stock || 1)}
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* ==================================
                ACTION BUTTONS
            ================================== */}

            <div className="product-actions">
              <button
                type="button"
                className="add-cart-button"
                onClick={handleAddToCart}
                disabled={Number(product.stock || 0) <= 0}
              >
                <FiShoppingBag />
                Add to Cart
              </button>

              <button
                type="button"
                className="buy-now-button"
                onClick={handleBuyNow}
                disabled={Number(product.stock || 0) <= 0}
              >
                <FiZap />
                Buy Now
              </button>
            </div>

            {/* LOW STOCK */}

            {Number(product.stock || 0) > 0 && Number(product.stock) <= 5 && (
              <p className="low-stock-message">
                Only {product.stock} left in stock — order soon!
              </p>
            )}
          </div>
        </section>

        {/* ======================================
            PRODUCT SPECIFICATIONS
        ====================================== */}

        <section className="product-extra-information">
          <div className="extra-heading">
            <span>DETAILS</span>

            <h2>Product Specifications</h2>
          </div>

          <div className="specification-grid">
            <div className="specification-item">
              <span>Category</span>

              <strong>{product.category || "Furniture"}</strong>
            </div>

            <div className="specification-item">
              <span>Brand</span>

              <strong>{product.brand || "FurniSpace"}</strong>
            </div>

            <div className="specification-item">
              <span>Material</span>

              <strong>{product.material || "Premium Material"}</strong>
            </div>

            <div className="specification-item">
              <span>Color</span>

              <strong>{product.color || "Natural"}</strong>
            </div>

            <div className="specification-item">
              <span>Dimensions</span>

              <strong>{product.dimensions || "Not specified"}</strong>
            </div>

            <div className="specification-item">
              <span>Availability</span>

              <strong>
                {Number(product.stock || 0) > 0
                  ? "Available"
                  : "Currently unavailable"}
              </strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
