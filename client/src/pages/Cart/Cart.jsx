import { useEffect, useState } from "react";

import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiArrowLeft,
  FiShoppingBag,
} from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";

import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  getCartTotal,
} from "../../utils/cartUtils";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const loadCart = () => {
    setCart(getCart());
  };

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const increaseQuantity = (item) => {
    updateCartQuantity(item._id, item.quantity + 1);

    loadCart();
  };

  const decreaseQuantity = (item) => {
    if (item.quantity <= 1) {
      removeFromCart(item._id);
    } else {
      updateCartQuantity(item._id, item.quantity - 1);
    }

    loadCart();
  };

  const handleRemove = (id) => {
    removeFromCart(id);

    loadCart();
  };

  const subtotal = getCartTotal();

  const deliveryCharge = subtotal > 0 ? 0 : 0;

  const total = subtotal + deliveryCharge;

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FiShoppingBag />
            </div>

            <h1>Your Cart is Empty</h1>

            <p>Looks like you haven't added anything to your cart yet.</p>

            <Link to="/products" className="continue-shopping-btn">
              Browse Furniture
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <button
            className="back-shopping"
            onClick={() => navigate("/products")}
          >
            <FiArrowLeft />
            Continue Shopping
          </button>

          <div>
            <p className="cart-label">YOUR BAG</p>

            <h1>Shopping Cart</h1>
          </div>
        </div>

        <div className="cart-layout">
          <section className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>

                <div className="cart-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(event) => {
                      event.target.onerror = null;

                      event.target.src = "/placeholder.jpg";
                    }}
                  />
                </div>

                <div className="cart-item-info">
                  <p className="cart-item-brand">{item.brand}</p>

                  <h2>{item.name}</h2>

                  <p className="cart-item-price">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>

                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(item)}
                    >
                      <FiMinus />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => increaseQuantity(item)}
                      disabled={item.quantity >= item.stock}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <strong>
                    ₹
                    {(
                      Number(item.price) * Number(item.quantity)
                    ).toLocaleString("en-IN")}
                  </strong>

                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FiTrash2 />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </section>

          <aside className="cart-summary">
            <p className="summary-label">ORDER SUMMARY</p>

            <h2>Your Order</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>

              <strong className="free">FREE</strong>
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

            <Link to="/products" className="summary-continue">
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
