import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";

import "./Cart.css";

function Cart() {
  // ================================
  // LOAD CART FROM LOCAL STORAGE
  // ================================
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      if (!savedCart) {
        return [];
      }

      return JSON.parse(savedCart);
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // ================================
  // REFRESH CART
  // ================================
  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      if (!savedCart) {
        setCartItems([]);
        return;
      }

      const parsedCart = JSON.parse(savedCart);

      setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
    }
  };

  // ================================
  // LISTEN FOR CART UPDATES
  // ================================
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);

      window.removeEventListener("storage", handleCartUpdate);
    };
  }, []);

  // ================================
  // INCREASE QUANTITY
  // ================================
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: Number(item.quantity || 1) + 1,
        };
      }

      return item;
    });

    setCartItems(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ================================
  // DECREASE QUANTITY
  // ================================
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: Math.max(1, Number(item.quantity || 1) - 1),
        };
      }

      return item;
    });

    setCartItems(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ================================
  // REMOVE ITEM
  // ================================
  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);

    setCartItems(updatedCart);

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ================================
  // CLEAR CART
  // ================================
  const clearCart = () => {
    localStorage.removeItem("cartItems");

    setCartItems([]);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ================================
  // TOTAL ITEMS
  // ================================
  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0,
  );

  // ================================
  // TOTAL PRICE
  // ================================
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  // ================================
  // EMPTY CART
  // ================================
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <FiShoppingBag />
          </div>

          <h2>Your Cart is Empty</h2>

          <p>You haven't added any furniture to your cart yet.</p>

          <Link to="/products" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // ================================
  // CART WITH PRODUCTS
  // ================================
  return (
    <main className="cart-page">
      <div className="cart-container">
        {/* CART HEADER */}
        <div className="cart-header">
          <div>
            <h1>Shopping Cart</h1>

            <p>
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        {/* CART CONTENT */}
        <div className="cart-content">
          {/* CART ITEMS */}
          <div className="cart-items">
            {cartItems.map((item) => {
              const image =
                item.images?.[0]?.url || item.images?.[0] || "/placeholder.jpg";

              const price = Number(item.price || 0);

              const quantity = Number(item.quantity || 1);

              return (
                <div className="cart-item" key={item._id}>
                  {/* IMAGE */}
                  <div className="cart-item-image">
                    <img src={image} alt={item.name || "Furniture"} />
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="cart-item-details">
                    <h3>{item.name || "Furniture Product"}</h3>

                    <p>{item.category || "Furniture"}</p>

                    <strong>₹{price.toLocaleString("en-IN")}</strong>
                  </div>

                  {/* QUANTITY */}
                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item._id)}
                      disabled={quantity <= 1}
                    >
                      <FiMinus />
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item._id)}
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
                    type="button"
                    className="remove-cart-item"
                    onClick={() => removeItem(item._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
            </div>

            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Cart;
