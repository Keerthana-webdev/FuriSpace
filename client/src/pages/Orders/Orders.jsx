import { useEffect, useState } from "react";
import { FiArrowRight, FiPackage, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import "./Orders.css";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // ==========================================
  // LOAD ORDERS
  // ==========================================

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

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadOrders();
  }, []);

  // ==========================================
  // LISTEN FOR ORDER UPDATES
  // ==========================================

  useEffect(() => {
    const handleOrdersUpdated = () => {
      loadOrders();
    };

    window.addEventListener("ordersUpdated", handleOrdersUpdated);

    return () => {
      window.removeEventListener("ordersUpdated", handleOrdersUpdated);
    };
  }, []);

  // ==========================================
  // STATUS CLASS
  // ==========================================

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

  if (orders.length === 0) {
    return (
      <main className="orders-page">
        <div className="orders-container">
          <div className="orders-header">
            <div>
              <h1>My Orders</h1>
              <p>Track and manage your orders</p>
            </div>
          </div>

          <div className="orders-empty">
            <FiPackage />

            <h2>No Orders Yet</h2>

            <p>You haven't placed any orders yet.</p>

            <button onClick={() => navigate("/products")}>
              <FiShoppingBag />
              Start Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-container">
        {/* HEADER */}

        <div className="orders-header">
          <div>
            <h1>My Orders</h1>

            <p>Track and manage your orders</p>
          </div>

          <span className="orders-count">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {/* ORDERS LIST */}

        <div className="orders-list">
          {orders
            .slice()
            .sort(
              (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
            )
            .map((order) => {
              const totalItems =
                order.items?.reduce(
                  (total, item) => total + Number(item.quantity || 1),
                  0,
                ) || 0;

              const orderDate = order.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A";

              return (
                <div className="order-card" key={order.orderId}>
                  {/* ORDER HEADER */}

                  <div className="order-card-header">
                    <div>
                      <span className="order-label">Order ID</span>

                      <strong>#{order.orderId}</strong>
                    </div>

                    <span className={getStatusClass(order.statusStep)}>
                      {order.status || "Order Placed"}
                    </span>
                  </div>

                  {/* ORDER INFO */}

                  <div className="order-card-info">
                    <div>
                      <span>Date</span>
                      <strong>{orderDate}</strong>
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

                  {/* ORDER BUTTON */}

                  <button
                    className="view-order-btn"
                    onClick={() => navigate(`/orders/${order.orderId}`)}
                  >
                    View Order
                    <FiArrowRight />
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default Orders;
