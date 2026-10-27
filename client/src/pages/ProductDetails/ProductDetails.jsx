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

  // Fetch individual product from MongoDB
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setSelectedImage(0);
        setQuantity(1);

        const data = await getProductById(id);

        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          setError(data.message || "Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Unable to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("Product ID is missing.");
      setLoading(false);
    }
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

        <button onClick={() => navigate("/products")}>
          Back to Products
        </button>
      </div>
    );
  }

  // MongoDB images are objects containing a Cloudinary URL.
  // This also supports products with string image URLs.
  const images = Array.isArray(product.images)
    ? product.images
        .map((image) =>
          typeof image === "string" ? image : image?.url
        )
        .filter(Boolean)
    : [];

  const displayImages =
    images.length > 0
      ? images
      : ["https://placehold.co/700x700?text=Furniture"];

  const currentImage =
    displayImages[selectedImage] || displayImages[0];

  const discount = Math.min(
    100,
    Math.max(0, Number(product.discount) || 0)
  );

  const price = Math.max(0, Number(product.price) || 0);
  const stock = Math.max(0, Number(product.stock) || 0);

  const originalPrice =
    discount > 0 && discount < 100
      ? price / (1 - discount / 100)
      : price;

  const increaseQuantity = () => {
    setQuantity((previous) =>
      Math.min(previous + 1, stock)
    );
  };

  const decreaseQuantity = () => {
    setQuantity((previous) =>
      Math.max(1, previous - 1)
    );
  };

  // Add product to cart or increase its existing quantity
  const addProductToCart = () => {
    if (stock <= 0) {
      alert("This product is currently out of stock.");
      return false;
    }

    try {
      const savedCart = localStorage.getItem("cartItems");
      const cart = savedCart ? JSON.parse(savedCart) : [];

      if (!Array.isArray(cart)) {
        throw new Error("Invalid cart data");
      }

      const existingIndex = cart.findIndex(
        (item) => item._id === product._id
      );

      let updatedCart;

      if (existingIndex !== -1) {
        const existingItem = cart[existingIndex];
        const existingQuantity = Number(
          existingItem.quantity || 1
        );

        const newQuantity = existingQuantity + quantity;

        if (newQuantity > stock) {
          alert(
            `Only ${stock} units of ${product.name} are available.`
          );
          return false;
        }

        updatedCart = cart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        if (quantity > stock) {
          alert(
            `Only ${stock} units of ${product.name} are available.`
          );
          return false;
        }

        updatedCart = [
          ...cart,
          {
            _id: product._id,
            name: product.name,
            price: product.price,
            images: product.images || [],
            quantity,
            stock: product.stock,
            discount: product.discount || 0,
            category: product.category || "Furniture",
            brand: product.brand || "FurniSpace",
            material: product.material || "",
            color: product.color || "",
            dimensions: product.dimensions || "",
          },
        ];
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(updatedCart)
      );

      window.dispatchEvent(new Event("cartUpdated"));

      return true;
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Unable to update your cart. Please try again.");
      return false;
    }
  };

  const handleAddToCart = () => {
    if (addProductToCart()) {
      alert(`${product.name} added to cart.`);
    }
  };

  const handleBuyNow = () => {
    if (addProductToCart()) {
      navigate("/checkout");
    }
  };

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
          <span
            role="link"
            tabIndex={0}
            onClick={() => navigate("/")}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/");
            }}
          >
            Home
          </span>
          <span>/</span>
          <span
            role="link"
            tabIndex={0}
            onClick={() => navigate("/products")}
            onKeyDown={(event) => {
              if (event.key === "Enter") navigate("/products");
            }}
          >
            Products
          </span>
          <span>/</span>
          <span>{product.category || "Furniture"}</span>
          <span>/</span>
          <strong>{product.name}</strong>
        </div>

        {/* MAIN PRODUCT */}
        <section className="product-details-main">
          {/* IMAGE GALLERY */}
          <div className="product-gallery">
            <div className="thumbnail-list">
              {displayImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={
                    selectedImage === index
                      ? "thumbnail active"
                      : "thumbnail"
                  }
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>

            <div className="main-product-image">
              {discount > 0 && (
                <div className="discount-badge">
                  {discount}% OFF
                </div>
              )}

              <img
                src={currentImage}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src =
                    "https://placehold.co/700x700?text=Furniture";
                }}
              />

              <button
                type="button"
                className="image-wishlist"
                aria-label="Add to wishlist"
                onClick={() =>
                  console.log("Wishlist:", product._id)
                }
              >
                <FiHeart />
              </button>
            </div>
          </div>

          {/* PRODUCT INFORMATION */}
          <div className="product-information">
            <p className="product-brand">
              {product.brand || "FurniSpace"}
            </p>

            <h1>{product.name}</h1>

            {/* RATING */}
            <div className="product-rating">
              <span className="stars">
                {"★".repeat(
                  Math.min(
                    5,
                    Math.max(
                      0,
                      Math.round(Number(product.rating) || 0)
                    )
                  )
                )}
              </span>

              <span>
                {Number(product.numReviews) > 0
                  ? `${product.rating || 0} (${product.numReviews} reviews)`
                  : "No reviews yet"}
              </span>
            </div>

            {/* PRICE */}
            <div className="product-price-section">
              <span className="current-price">
                ₹{price.toLocaleString("en-IN")}
              </span>

              {discount > 0 && discount < 100 && (
                <>
                  <span className="original-price">
                    ₹{Math.round(originalPrice).toLocaleString("en-IN")}
                  </span>

                  <span className="save-text">
                    Save {discount}%
                  </span>
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
                <strong
                  className={
                    stock > 0 ? "in-stock" : "out-stock"
                  }
                >
                  {stock > 0 ? "In Stock" : "Out of Stock"}
                </strong>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="quantity-section">
              <span>Quantity</span>

              <div className="quantity-control">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= stock}
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="product-actions">
              <button
                type="button"
                className="add-cart-button"
                onClick={handleAddToCart}
                disabled={stock <= 0}
              >
                <FiShoppingBag />
                Add to Cart
              </button>

              <button
                type="button"
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

        {/* PRODUCT SPECIFICATIONS */}
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
                {stock > 0
                  ? `${stock} units available`
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