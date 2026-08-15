import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiShoppingBag,
} from "react-icons/fi";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  // Load cart from localStorage when component starts
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // Save cart whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.min(
                Number(item.quantity || 1) + 1,
                Number(item.stock || 99),
              ),
            }
          : item,
      ),
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(Number(item.quantity || 1) - 1, 1),
            }
          : item,
      ),
    );
  };

  // Remove product
  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item._id !== id));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + Number(item.price || 0) * Number(item.quantity || 1);
  }, 0);

  // Shipping
  const shipping = subtotal > 0 ? 0 : 0;

  // Total
  const total = subtotal + shipping;

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <FiShoppingBag className="empty-cart-icon" />

            <h2>Your Cart is Empty</h2>

            <p>You haven't added any furniture to your cart yet.</p>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/products")}
            >
              <FiArrowLeft />
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        {/* HEADER */}
        <div className="cart-header">
          <button
            className="back-products-btn"
            onClick={() => navigate("/products")}
          >
            <FiArrowLeft />
            Back to Products
          </button>

          <div className="cart-title-row">
            <div>
              <p className="cart-label">YOUR SHOPPING BAG</p>

              <h1>Shopping Cart</h1>

              <p>
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>

            <button className="clear-cart-btn" onClick={clearCart}>
              <FiTrash2 />
              Clear Cart
            </button>
          </div>
        </div>

        {/* CART CONTENT */}
        <div className="cart-content">
          {/* CART ITEMS */}
          <section className="cart-items">
            {cartItems.map((item) => {
              const image =
                item.images?.[0]?.url || item.images?.[0] || "/placeholder.jpg";

              const price = Number(item.price || 0);

              const quantity = Number(item.quantity || 1);

              return (
                <div className="cart-item" key={item._id}>
                  {/* IMAGE */}
                  <div
                    className="cart-item-image"
                    onClick={() => navigate(`/products/${item._id}`)}
                  >
                    <img src={image} alt={item.name || "Furniture"} />
                  </div>

                  {/* DETAILS */}
                  <div className="cart-item-details">
                    <p className="cart-item-brand">
                      {item.brand || "FurniSpace"}
                    </p>

                    <h3 onClick={() => navigate(`/products/${item._id}`)}>
                      {item.name}
                    </h3>

                    <p className="cart-item-category">
                      {item.category || "Furniture"}
                    </p>

                    <div className="cart-item-price">
                      ₹{price.toLocaleString("en-IN")}
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="cart-quantity">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      disabled={quantity <= 1}
                    >
                      <FiMinus />
                    </button>

                    <span>{quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      disabled={quantity >= Number(item.stock || 99)}
                    >
                      <FiPlus />
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="cart-item-total">
                    ₹{(price * quantity).toLocaleString("en-IN")}
                  </div>

                  {/* REMOVE */}
                  <button
                    className="remove-cart-item"
                    onClick={() => removeItem(item._id)}
                    title="Remove item"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              );
            })}
          </section>

          {/* ORDER SUMMARY */}
          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <strong>{shipping === 0 ? "FREE" : `₹${shipping}`}</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total</span>

              <strong>₹{total.toLocaleString("en-IN")}</strong>
            </div>

            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
