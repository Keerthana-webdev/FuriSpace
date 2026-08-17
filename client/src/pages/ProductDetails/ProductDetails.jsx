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

import { getProductById } from "../../services/productService";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);

  // =====================================================
  // GET PRODUCT
  // =====================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        setError("");

        const data = await getProductById(id);

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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="details-spinner"></div>

        <p>Loading product...</p>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !product) {
    return (
      <div className="product-details-error">
        <h2>Product Not Found</h2>

        <p>{error || "This product does not exist."}</p>

        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );
  }

  // =====================================================
  // PRODUCT DATA
  // =====================================================

  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/700x700?text=Furniture"];

  const currentImage = images[selectedImage] || images[0];

  const discount = Number(product.discount || 0);

  const price = Number(product.price || 0);

  const stock = Number(product.stock || 0);

  const originalPrice = discount > 0 ? price / (1 - discount / 100) : price;

  // =====================================================
  // QUANTITY
  // =====================================================

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
    try {
      // Get existing cart
      const savedCart = localStorage.getItem("cartItems");

      const cart = savedCart ? JSON.parse(savedCart) : [];

      // Check whether product already exists
      const existingItem = cart.find((item) => item._id === product._id);

      let updatedCart;

      // =================================================
      // PRODUCT ALREADY IN CART
      // =================================================

      if (existingItem) {
        updatedCart = cart.map((item) => {
          if (item._id === product._id) {
            return {
              ...item,

              quantity: Number(item.quantity || 1) + quantity,
            };
          }

          return item;
        });
      }

      // =================================================
      // NEW PRODUCT
      // =================================================
      else {
        updatedCart = [
          ...cart,

          {
            ...product,

            quantity: quantity,
          },
        ];
      }

      // Save cart
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      // Tell other components cart changed
      window.dispatchEvent(new Event("cartUpdated"));

      console.log("Cart updated:", updatedCart);

      alert(`${product.name} added to cart`);
    } catch (error) {
      console.error("Error adding product to cart:", error);

      alert("Unable to add product to cart");
    }
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      const cart = savedCart ? JSON.parse(savedCart) : [];

      const existingItem = cart.find((item) => item._id === product._id);

      let updatedCart;

      if (existingItem) {
        updatedCart = cart.map((item) =>
          item._id === product._id
            ? {
                ...item,

                quantity: Number(item.quantity || 1) + quantity,
              }
            : item,
        );
      } else {
        updatedCart = [
          ...cart,

          {
            ...product,

            quantity: quantity,
          },
        ];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      window.dispatchEvent(new Event("cartUpdated"));

      navigate("/checkout");
    } catch (error) {
      console.error("Error processing Buy Now:", error);

      alert("Unable to proceed to checkout");
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="product-details-page">
      <div className="details-container">
        {/* BACK BUTTON */}

        <button
          className="back-to-products"
          onClick={() => navigate("/products")}
        >
          <FiArrowLeft />

          <span>Back to Products</span>
        </button>

        {/* BREADCRUMB */}

        <div className="product-breadcrumb">
          Home
          <span>/</span>
          Products
          <span>/</span>
          {product.category || "Furniture"}
          <span>/</span>
          <strong>{product.name}</strong>
        </div>

        {/* MAIN PRODUCT */}

        <section className="product-details-main">
          {/* IMAGE SECTION */}

          <div className="product-gallery">
            <div className="thumbnail-list">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={
                    selectedImage === index ? "thumbnail active" : "thumbnail"
                  }
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>

            <div className="main-product-image">
              {discount > 0 && (
                <div className="discount-badge">{discount}% OFF</div>
              )}

              <img src={currentImage} alt={product.name} />

              <button
                className="image-wishlist"
                onClick={() => console.log("Wishlist:", product._id)}
              >
                <FiHeart />
              </button>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}

          <div className="product-information">
            <p className="product-brand">{product.brand || "FurniSpace"}</p>

            <h1>{product.name}</h1>

            {/* RATING */}

            <div className="product-rating">
              <span className="stars">
                {"★".repeat(Math.round(Number(product.rating || 0)))}
              </span>

              <span>{product.rating || "No rating"}</span>
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

            {/* QUICK SPECIFICATIONS */}

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

                <strong className={stock > 0 ? "in-stock" : "out-stock"}>
                  {stock > 0 ? "In Stock" : "Out of Stock"}
                </strong>
              </div>
            </div>

            {/* QUANTITY */}

            <div className="quantity-section">
              <span>Quantity</span>

              <div className="quantity-control">
                <button onClick={decreaseQuantity} disabled={quantity === 1}>
                  <FiMinus />
                </button>

                <span>{quantity}</span>

                <button onClick={increaseQuantity} disabled={quantity >= stock}>
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}

            <div className="product-actions">
              <button
                className="add-cart-button"
                onClick={handleAddToCart}
                disabled={stock <= 0}
              >
                <FiShoppingBag />
                Add to Cart
              </button>

              <button
                className="buy-now-button"
                onClick={handleBuyNow}
                disabled={stock <= 0}
              >
                <FiZap />
                Buy Now
              </button>
            </div>

            {/* LOW STOCK */}

            {stock > 0 && stock <= 5 && (
              <p className="low-stock-message">
                Only {stock} left in stock — order soon!
              </p>
            )}
          </div>
        </section>

        {/* SPECIFICATIONS */}

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
                {stock > 0 ? "Available" : "Currently unavailable"}
              </strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
