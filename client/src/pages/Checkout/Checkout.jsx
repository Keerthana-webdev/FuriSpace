import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiLock, FiShoppingBag } from "react-icons/fi";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [formError, setFormError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      const cart = savedCart ? JSON.parse(savedCart) : [];

      setCartItems(Array.isArray(cart) ? cart : []);
    } catch (error) {
      console.error("Error loading checkout cart:", error);

      setCartItems([]);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setFormError("");
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  const deliveryCharge = 0;

  const totalPrice = subtotal + deliveryCharge;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    setFormError("");

    // Check cart
    if (cartItems.length === 0) {
      setFormError("Your cart is empty.");
      return;
    }

    // Validate full name
    if (!formData.fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    // Validate email
    if (!formData.email.trim()) {
      setFormError("Please enter your email.");
      return;
    }

    // Validate phone
    if (!/^\d{10}$/.test(formData.phone)) {
      setFormError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate address
    if (!formData.address.trim()) {
      setFormError("Please enter your address.");
      return;
    }

    // Validate city
    if (!formData.city.trim()) {
      setFormError("Please enter your city.");
      return;
    }

    // Validate state
    if (!formData.state.trim()) {
      setFormError("Please enter your state.");
      return;
    }

    // Validate pincode
    if (!/^\d{6}$/.test(formData.pincode)) {
      setFormError("Please enter a valid 6-digit pincode.");
      return;
    }

    // Create order
    const orderData = {
      orderId: `ORD-${Date.now()}`,

      items: cartItems,

      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      },

      shippingAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },

      subtotal: subtotal,

      deliveryCharge: deliveryCharge,

      totalAmount: totalPrice,

      status: "Order Placed",

      createdAt: new Date().toISOString(),
    };

    console.log("New Order:", orderData);

    // Get existing orders
    let existingOrders = [];

    try {
      const savedOrders = localStorage.getItem("orders");

      existingOrders = savedOrders ? JSON.parse(savedOrders) : [];

      if (!Array.isArray(existingOrders)) {
        existingOrders = [];
      }
    } catch (error) {
      console.error("Error reading existing orders:", error);

      existingOrders = [];
    }

    // Add new order
    existingOrders.push(orderData);

    // Save all orders
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Save latest order separately
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Clear cart
    localStorage.removeItem("cartItems");

    // Show success screen
    setOrderPlaced(true);
  };

  // SUCCESS SCREEN
  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">
            <FiCheck />
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for your order, <strong>{formData.fullName}</strong>.
          </p>

          <p>
            Your order total is{" "}
            <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
          </p>

          <div className="success-buttons">
            <button
              onClick={() => navigate("/orders")}
              className="view-orders-btn"
            >
              View Orders
            </button>

            <button
              onClick={() => navigate("/products")}
              className="continue-shopping-btn"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <div className="checkout-empty-icon">
            <FiShoppingBag />
          </div>

          <h2>Your Cart is Empty</h2>

          <p>Add some furniture to your cart before checking out.</p>

          <Link to="/products" className="checkout-shop-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // CHECKOUT PAGE
  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* HEADER */}
        <div className="checkout-header">
          <button className="back-to-cart" onClick={() => navigate("/cart")}>
            <FiArrowLeft />
            <span>Back to Cart</span>
          </button>

          <div className="checkout-title">
            <h1>Checkout</h1>
            <p>Complete your order</p>
          </div>

          <div className="checkout-secure">
            <FiLock />
            <span>Secure Checkout</span>
          </div>
        </div>

        <div className="checkout-content">
          {/* FORM */}
          <div className="checkout-form-section">
            <div className="checkout-section-card">
              <div className="section-title">
                <span>1</span>

                <div>
                  <h2>Delivery Information</h2>
                  <p>Enter your delivery details</p>
                </div>
              </div>

              <form onSubmit={handlePlaceOrder}>
                {/* FULL NAME */}
                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                {/* EMAIL + PHONE */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit phone number"
                      maxLength="10"
                    />
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="form-group">
                  <label>Address</label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    rows="4"
                  />
                </div>

                {/* CITY + STATE */}
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>

                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                    />
                  </div>
                </div>

                {/* PINCODE */}
                <div className="form-group">
                  <label>Pincode</label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                  />
                </div>

                {/* ERROR */}
                {formError && <div className="checkout-error">{formError}</div>}

                {/* PLACE ORDER */}
                <button type="submit" className="place-order-btn">
                  <FiCheck />
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="checkout-summary-section">
            <div className="checkout-summary-card">
              <h2>Order Summary</h2>

              <div className="checkout-products">
                {cartItems.map((item, index) => {
                  const image =
                    item.images?.[0]?.url ||
                    item.images?.[0] ||
                    item.image ||
                    "/placeholder.jpg";

                  const price = Number(item.price || 0);

                  const quantity = Number(item.quantity || 1);

                  return (
                    <div
                      className="checkout-product"
                      key={item._id || item.id || index}
                    >
                      <div className="checkout-product-image">
                        <img src={image} alt={item.name || "Furniture"} />

                        <span>{quantity}</span>
                      </div>

                      <div className="checkout-product-info">
                        <h3>{item.name || "Furniture Product"}</h3>

                        <p>
                          ₹{price.toLocaleString("en-IN")} × {quantity}
                        </p>
                      </div>

                      <strong>
                        ₹{(price * quantity).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  );
                })}
              </div>

              {/* TOTALS */}
              <div className="summary-details">
                <div className="summary-row">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>

                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="summary-row">
                  <span>Delivery</span>

                  <span className="free-delivery">FREE</span>
                </div>

                <hr />

                <div className="summary-total">
                  <span>Total</span>

                  <strong>₹{totalPrice.toLocaleString("en-IN")}</strong>
                </div>
              </div>

              {/* SECURITY */}
              <div className="checkout-security">
                <FiLock />

                <div>
                  <strong>Secure Payment</strong>

                  <p>Your information is protected and secure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
