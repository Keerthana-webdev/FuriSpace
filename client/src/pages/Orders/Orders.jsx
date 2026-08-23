import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiPackage,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

import "./Orders.css";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // Load ALL orders
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem("orders");

      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);

        if (Array.isArray(parsedOrders)) {
          // Show newest order first
          setOrders([...parsedOrders].reverse());
        } else {
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    }
  }, []);

  // Delete one order
  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.orderId !== orderId);

    setOrders(updatedOrders);

    // Because orders are displayed reversed,
    // reverse them again before saving.
    localStorage.setItem(
      "orders",
      JSON.stringify([...updatedOrders].reverse()),
    );
  };

  // Clear all orders
  const handleClearOrders = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all orders?",
    );

    if (!confirmDelete) {
      return;
    }

    localStorage.removeItem("orders");

    localStorage.removeItem("lastOrder");

    setOrders([]);
  };

  // Empty Orders
  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <FiShoppingBag />
          </div>

          <h1>No Orders Yet</h1>

          <p>
            You haven't placed any orders yet. Start shopping to place your
            first order.
          </p>

          <Link to="/products" className="orders-shop-btn">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-container">
        {/* HEADER */}
        <div className="orders-header">
          <button
            className="orders-back-btn"
            onClick={() => navigate("/products")}
          >
            <FiArrowLeft />

            <span>Continue Shopping</span>
          </button>

          <div>
            <h1>My Orders</h1>

            <p>
              You have {orders.length}{" "}
              {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>

          <button className="clear-orders-btn" onClick={handleClearOrders}>
            <FiTrash2 />

            <span>Clear Orders</span>
          </button>
        </div>

        {/* ALL ORDERS */}
        <div className="orders-list">
          {orders.map((order, index) => {
            const orderDate = order.createdAt
              ? new Date(order.createdAt).toLocaleString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Date unavailable";

            const totalItems =
              order.items?.reduce(
                (total, item) => total + Number(item.quantity || 1),
                0,
              ) || 0;

            const orderNumber = order.orderId || `ORD-${orders.length - index}`;

            return (
              <div
                className="order-card"
                key={order.orderId || order.createdAt || index}
              >
                {/* ORDER HEADER */}
                <div className="order-card-header">
                  <div>
                    <span className="order-label">Order</span>

                    <h2>#{orderNumber}</h2>
                  </div>

                  <div className="order-status">
                    <FiCheckCircle />

                    <span>{order.status || "Order Placed"}</span>
                  </div>
                </div>

                {/* ORDER INFORMATION */}
                <div className="order-info">
                  <div className="order-info-item">
                    <FiPackage />

                    <div>
                      <span>Order Date</span>

                      <strong>{orderDate}</strong>
                    </div>
                  </div>

                  <div className="order-info-item">
                    <FiShoppingBag />

                    <div>
                      <span>Total Items</span>

                      <strong>{totalItems}</strong>
                    </div>
                  </div>
                </div>

                {/* DELIVERY INFORMATION */}
                <div className="order-section">
                  <h3>Delivery Information</h3>

                  <div className="customer-details">
                    <p>
                      <strong>Name:</strong> {order.customer?.fullName || "N/A"}
                    </p>

                    <p>
                      <strong>Email:</strong> {order.customer?.email || "N/A"}
                    </p>

                    <p>
                      <strong>Phone:</strong> {order.customer?.phone || "N/A"}
                    </p>

                    <p>
                      <strong>Address:</strong>{" "}
                      {order.shippingAddress?.address || "N/A"}
                    </p>

                    <p>
                      <strong>City:</strong>{" "}
                      {order.shippingAddress?.city || "N/A"}
                    </p>

                    <p>
                      <strong>State:</strong>{" "}
                      {order.shippingAddress?.state || "N/A"}
                    </p>

                    <p>
                      <strong>Pincode:</strong>{" "}
                      {order.shippingAddress?.pincode || "N/A"}
                    </p>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="order-section">
                  <h3>Ordered Products</h3>

                  <div className="ordered-products">
                    {order.items?.map((item, itemIndex) => {
                      const image =
                        item.images?.[0]?.url ||
                        item.images?.[0] ||
                        item.image ||
                        "/placeholder.jpg";

                      const price = Number(item.price || 0);

                      const quantity = Number(item.quantity || 1);

                      return (
                        <div
                          className="ordered-product"
                          key={item._id || item.id || itemIndex}
                        >
                          <div className="ordered-product-image">
                            <img src={image} alt={item.name || "Furniture"} />
                          </div>

                          <div className="ordered-product-info">
                            <h4>{item.name || "Furniture Product"}</h4>

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

                {/* PRICE SUMMARY */}
                <div className="order-summary">
                  <div className="order-summary-row">
                    <span>Subtotal</span>

                    <span>
                      ₹{Number(order.subtotal || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="order-summary-row">
                    <span>Delivery</span>

                    <span className="free-delivery">FREE</span>
                  </div>

                  <div className="order-summary-divider"></div>

                  <div className="order-total">
                    <span>Total</span>

                    <strong>
                      ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                <div className="order-footer">
                  <button
                    className="view-order-btn"
                    onClick={() => navigate(`/orders/${order.orderId}`)}
                  >
                    View Details
                  </button>

                  <button
                    className="delete-order-btn"
                    onClick={() => handleDeleteOrder(order.orderId)}
                  >
                    <FiTrash2 />
                    Delete Order
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Orders;
