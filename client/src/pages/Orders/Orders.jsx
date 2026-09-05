import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const loadOrders = () => {
    try {
      const savedOrders = localStorage.getItem("orders");

      if (!savedOrders) {
        setOrders([]);
        return;
      }

      const parsedOrders = JSON.parse(savedOrders);

      if (Array.isArray(parsedOrders)) {
        setOrders(parsedOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error loading orders:", error);

      setOrders([]);
    }
  };

  useEffect(() => {
    // Load orders when page opens
    loadOrders();

    // Listen for admin status changes
    const handleOrdersUpdated = () => {
      loadOrders();
    };

    window.addEventListener("ordersUpdated", handleOrdersUpdated);

    // Cleanup
    return () => {
      window.removeEventListener("ordersUpdated", handleOrdersUpdated);
    };
  }, []);

  const getStatusIcon = (statusStep) => {
    const step = Number(statusStep || 1);

    if (step === 2) {
      return <FiCheckCircle />;
    }

    if (step === 3) {
      return <FiTruck />;
    }

    if (step === 4) {
      return <FiPackage />;
    }

    return <FiClock />;
  };

  const getStatusClass = (statusStep) => {
    const step = Number(statusStep || 1);

    if (step === 2) {
      return "order-status confirmed";
    }

    if (step === 3) {
      return "order-status shipped";
    }

    if (step === 4) {
      return "order-status delivered";
    }

    return "order-status placed";
  };

  const formatDate = (date) => {
    if (!date) {
      return "Date unavailable";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="orders-empty">
          <div className="orders-empty-icon">
            <FiShoppingBag />
          </div>

          <h1>No Orders Yet</h1>
          <p>You haven't placed any orders yet.</p>

          <Link to="/products" className="start-shopping-btn">
            Start Shopping
            <FiArrowRight />
          </Link>
        </div>
      </main>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <main className="orders-page">
      <div className="orders-container">
        {/* HEADER */}

        <div className="orders-header">
          <div>
            <h1>My Orders</h1>

            <p>Track and manage your orders</p>
          </div>

          <div className="orders-count">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </div>
        </div>

        {/* ORDERS LIST */}

        <div className="orders-list">
          {orders
            .slice()
            .reverse()
            .map((order) => {
              const totalItems =
                order.items?.reduce(
                  (total, item) => total + Number(item.quantity || 1),
                  0,
                ) || 0;

              const statusStep = Number(order.statusStep || 1);

              return (
                <div className="order-card" key={order.orderId}>
                  {/* ORDER HEADER */}

                  <div className="order-card-header">
                    <div>
                      <span className="order-label">Order ID</span>

                      <strong>#{order.orderId}</strong>
                    </div>

                    <div className={getStatusClass(statusStep)}>
                      {getStatusIcon(statusStep)}

                      <span>{order.status || "Order Placed"}</span>
                    </div>
                  </div>

                  {/* ORDER INFO */}

                  <div className="order-card-info">
                    <div>
                      <span>Date</span>

                      <strong>{formatDate(order.createdAt)}</strong>
                    </div>

                    <div>
                      <span>Items</span>

                      <strong>{totalItems}</strong>
                    </div>

                    <div>
                      <span>Total</span>

                      <strong>
                        ₹
                        {Number(order.totalAmount || 0).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>

                  {/* VIEW ORDER */}

                  <div className="order-card-footer">
                    <Link
                      to={`/orders/${order.orderId}`}
                      className="view-order-btn"
                    >
                      View Order
                      <FiArrowRight />
                    </Link>
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
