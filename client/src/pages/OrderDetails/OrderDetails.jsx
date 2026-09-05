import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FiArrowLeft,
  FiCheck,
  FiCheckCircle,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import "./OrderDetails.css";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const loadOrder = () => {
    try {
      const savedOrders = localStorage.getItem("orders");

      if (!savedOrders) {
        setOrder(null);
        return;
      }

      const orders = JSON.parse(savedOrders);

      if (!Array.isArray(orders)) {
        setOrder(null);
        return;
      }

      const foundOrder = orders.find(
        (item) => String(item.orderId) === String(orderId),
      );

      setOrder(foundOrder || null);
    } catch (error) {
      console.error("Error loading order details:", error);

      setOrder(null);
    }
  };

  useEffect(() => {
    // Load order initially
    loadOrder();

    // Listen for admin changes
    const handleOrdersUpdated = () => {
      loadOrder();
    };

    window.addEventListener("ordersUpdated", handleOrdersUpdated);

    // Cleanup
    return () => {
      window.removeEventListener("ordersUpdated", handleOrdersUpdated);
    };
  }, [orderId]);

  // ==========================================
  // ORDER NOT FOUND
  // ==========================================

  if (!order) {
    return (
      <main className="order-details-page">
        <div className="order-not-found">
          <div className="not-found-icon">
            <FiPackage />
          </div>

          <h1>Order Not Found</h1>

          <p>We couldn't find the order you're looking for.</p>

          <button
            className="back-orders-btn"
            onClick={() => navigate("/orders")}
          >
            <FiArrowLeft />
            Back to Orders
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // ORDER DATE
  // ==========================================

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date unavailable";

  // ==========================================
  // TOTAL ITEMS
  // ==========================================

  const totalItems =
    order.items?.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0,
    ) || 0;

  // ==========================================
  // CURRENT STATUS STEP
  //
  // 1 = Order Placed
  // 2 = Order Confirmed
  // 3 = Shipped
  // 4 = Delivered
  // ==========================================

  const currentStep = Number(order.statusStep) || 1;

  // ==========================================
  // TRACKING STEPS
  // ==========================================

  const trackingSteps = [
    {
      step: 1,
      title: "Order Placed",
      description: "Your order has been successfully placed.",
      icon: <FiCheckCircle />,
    },

    {
      step: 2,
      title: "Order Confirmed",
      description: "Your order has been confirmed.",
      icon: <FiCheck />,
    },

    {
      step: 3,
      title: "Shipped",
      description: "Your order has been shipped.",
      icon: <FiTruck />,
    },

    {
      step: 4,
      title: "Delivered",
      description: "Your order has been delivered.",
      icon: <FiPackage />,
    },
  ];

  // ==========================================
  // UI
  // ==========================================

  return (
    <main className="order-details-page">
      <div className="order-details-container">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="order-details-header">
          <button
            className="back-orders-btn"
            onClick={() => navigate("/orders")}
          >
            <FiArrowLeft />
            Back to Orders
          </button>

          <div className="order-details-title">
            <h1>Order Details</h1>

            <p>#{order.orderId}</p>
          </div>
        </div>

        {/* ==========================================
            STATUS CARD
        ========================================== */}

        <div className="order-status-card">
          <div className="status-icon">
            <FiCheckCircle />
          </div>

          <div>
            <span>Current Status</span>

            <h2>{order.status || "Order Placed"}</h2>
          </div>

          <div className="status-date">
            <span>Order Date</span>

            <strong>{orderDate}</strong>
          </div>
        </div>

        {/* ==========================================
            TRACKING
        ========================================== */}

        <div className="tracking-card">
          <div className="tracking-header">
            <div>
              <h2>Track Your Order</h2>

              <p>Follow your order progress</p>
            </div>

            <FiTruck />
          </div>

          <div className="tracking-timeline">
            {trackingSteps.map((item, index) => {
              const completed = currentStep >= item.step;

              const active = currentStep === item.step;

              return (
                <div
                  className={`tracking-step ${completed ? "completed" : ""} ${
                    active ? "active" : ""
                  }`}
                  key={item.step}
                >
                  {/* ICON */}

                  <div className="tracking-icon">
                    {completed ? <FiCheck /> : item.icon}
                  </div>

                  {/* CONTENT */}

                  <div className="tracking-content">
                    <h3>{item.title}</h3>

                    <p>{item.description}</p>
                  </div>

                  {/* LINE */}

                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`tracking-line ${
                        currentStep > item.step ? "completed-line" : ""
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            DETAILS GRID
        ========================================== */}

        <div className="order-details-grid">
          {/* ==========================================
              PRODUCTS
          ========================================== */}

          <div className="details-card">
            <div className="details-card-title">
              <FiShoppingBag />

              <h2>Ordered Products</h2>
            </div>

            <div className="details-products">
              {order.items?.map((item, index) => {
                const image =
                  item.images?.[0]?.url ||
                  item.images?.[0] ||
                  item.image ||
                  "/placeholder.jpg";

                const price = Number(item.price || 0);

                const quantity = Number(item.quantity || 1);

                return (
                  <div
                    className="details-product"
                    key={item._id || item.id || index}
                  >
                    <div className="details-product-image">
                      <img src={image} alt={item.name || "Furniture"} />
                    </div>

                    <div className="details-product-info">
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
          </div>

          {/* ==========================================
              DELIVERY INFORMATION
          ========================================== */}

          <div className="details-card">
            <div className="details-card-title">
              <FiMapPin />

              <h2>Delivery Information</h2>
            </div>

            <div className="delivery-details">
              <div>
                <span>Full Name</span>

                <strong>{order.customer?.fullName || "N/A"}</strong>
              </div>

              <div>
                <span>Email</span>

                <strong>{order.customer?.email || "N/A"}</strong>
              </div>

              <div>
                <span>Phone</span>

                <strong>{order.customer?.phone || "N/A"}</strong>
              </div>

              <div>
                <span>Address</span>

                <strong>{order.shippingAddress?.address || "N/A"}</strong>
              </div>

              <div>
                <span>City</span>

                <strong>{order.shippingAddress?.city || "N/A"}</strong>
              </div>

              <div>
                <span>State</span>

                <strong>{order.shippingAddress?.state || "N/A"}</strong>
              </div>

              <div>
                <span>Pincode</span>

                <strong>{order.shippingAddress?.pincode || "N/A"}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            ORDER SUMMARY
        ========================================== */}

        <div className="details-card price-card">
          <h2>Order Summary</h2>

          <div className="price-row">
            <span>Total Items</span>

            <span>{totalItems}</span>
          </div>

          <div className="price-row">
            <span>Subtotal</span>

            <span>₹{Number(order.subtotal || 0).toLocaleString("en-IN")}</span>
          </div>

          <div className="price-row">
            <span>Delivery</span>

            <span className="free">FREE</span>
          </div>

          <div className="price-divider"></div>

          <div className="final-price">
            <span>Total Amount</span>

            <strong>
              ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        {/* ==========================================
            BUTTONS
        ========================================== */}

        <div className="order-details-actions">
          <Link to="/products" className="shop-more-btn">
            <FiShoppingBag />
            Continue Shopping
          </Link>

          <button
            className="orders-list-btn"
            onClick={() => navigate("/orders")}
          >
            <FiArrowLeft />
            All Orders
          </button>
        </div>
      </div>
    </main>
  );
}

export default OrderDetails;
