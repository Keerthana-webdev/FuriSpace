import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiLock, FiShoppingBag } from "react-icons/fi";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [formError, setFormError] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Load cart items
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

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setFormError("");
  };

  // Total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0,
  );

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  // Free delivery
  const deliveryCharge = 0;

  // Final total
  const totalPrice = subtotal + deliveryCharge;

  // Place order
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
    if (!formData.phone.trim()) {
      setFormError("Please enter your phone number.");
      return;
    }

    if (formData.phone.length !== 10) {
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
    if (!formData.pincode.trim()) {
      setFormError("Please enter your pincode.");
      return;
    }

    if (formData.pincode.length !== 6) {
      setFormError("Please enter a valid 6-digit pincode.");
      return;
    }

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const orderData = {
      // Unique order ID
      orderId: `ORD-${Date.now()}`,

      // Order tracking status
      status: "Order Placed",

      // 1 = Order Placed
      // 2 = Order Confirmed
      // 3 = Shipped
      // 4 = Delivered
      statusStep: 1,

      // Products
      items: cartItems,

      // Customer details
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      },

      // Delivery address
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },

      // Price details
      subtotal: subtotal,

      deliveryCharge: deliveryCharge,

      totalAmount: totalPrice,

      // Order creation date
      createdAt: new Date().toISOString(),
    };

    console.log("Order data:", orderData);

    // ==========================================
    // SAVE ORDER
    // ==========================================

    try {
      const savedOrders = localStorage.getItem("orders");

      const existingOrders = savedOrders ? JSON.parse(savedOrders) : [];

      // Make sure existing orders are an array
      const ordersArray = Array.isArray(existingOrders) ? existingOrders : [];

      // Add new order without deleting old orders
      const updatedOrders = [...ordersArray, orderData];

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      // ==========================================
      // CLEAR CART AFTER ORDER
      // ==========================================

      localStorage.removeItem("cartItems");

      setCartItems([]);

      // Show success page
      setOrderPlaced(true);
    } catch (error) {
      console.error("Error saving order:", error);

      setFormError("Unable to save your order. Please try again.");
    }
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cartItems.length === 0 && !orderPlaced) {
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

  // ==========================================
  // ORDER SUCCESS
  // ==========================================

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">
            <FiCheck />
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>Thank you for your order, {formData.fullName}.</p>

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

  // ==========================================
  // CHECKOUT PAGE
  // ==========================================

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

        {/* CHECKOUT CONTENT */}

        <div className="checkout-content">
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
                  ></textarea>
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

          <div className="checkout-summary-section">
            <div className="checkout-summary-card">
              <h2>Order Summary</h2>

              {/* PRODUCTS */}

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
