import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiShoppingBag,
  FiTruck,
  FiXCircle,
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
    loadOrders();

    const handleOrdersUpdated = () => {
      loadOrders();
    };

    const handleStorageChange = (event) => {
      if (event.key === "orders") {
        loadOrders();
      }
    };

    window.addEventListener("ordersUpdated", handleOrdersUpdated);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("ordersUpdated", handleOrdersUpdated);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const getStatusIcon = (statusStep, status) => {
    if (status === "Cancelled") {
      return <FiXCircle />;
    }

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

  const getStatusClass = (statusStep, status) => {
    if (status === "Cancelled") {
      return "order-status cancelled";
    }

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

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) {
      return "Date unavailable";
    }

    return formattedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleCancelOrder = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const savedOrders = localStorage.getItem("orders");

      if (!savedOrders) {
        return;
      }

      const parsedOrders = JSON.parse(savedOrders);

      if (!Array.isArray(parsedOrders)) {
        return;
      }

      const now = new Date().toISOString();

      const updatedOrders = parsedOrders.map((order) => {
        if (String(order.orderId) !== String(orderId)) {
          return order;
        }

        const existingHistory = Array.isArray(order.statusHistory)
          ? order.statusHistory
          : [
              {
                status: order.status || "Order Placed",
                date: order.createdAt || now,
              },
            ];

        const lastStatus = existingHistory[existingHistory.length - 1]?.status;

        const updatedHistory =
          lastStatus === "Cancelled"
            ? existingHistory
            : [
                ...existingHistory,
                {
                  status: "Cancelled",
                  date: now,
                },
              ];

        return {
          ...order,
          status: "Cancelled",
          statusStep: 0,
          updatedAt: now,
          statusHistory: updatedHistory,
        };
      });

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      setOrders(updatedOrders);

      window.dispatchEvent(new Event("ordersUpdated"));
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
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

  return (
    <main className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <div>
            <h1>My Orders</h1>
            <p>Track and manage your orders</p>
          </div>

          <div className="orders-count">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </div>
        </div>

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

              const canCancel = statusStep < 3 && order.status !== "Cancelled";

              return (
                <div className="order-card" key={order.orderId}>
                  <div className="order-card-header">
                    <div>
                      <span className="order-label">Order ID</span>

                      <strong>#{order.orderId}</strong>
                    </div>

                    <div className={getStatusClass(statusStep, order.status)}>
                      {getStatusIcon(statusStep, order.status)}

                      <span>{order.status || "Order Placed"}</span>
                    </div>
                  </div>

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

                  <div className="order-card-footer">
                    <Link
                      to={`/orders/${order.orderId}`}
                      className="view-order-btn"
                    >
                      View Order
                      <FiArrowRight />
                    </Link>

                    {canCancel && (
                      <button
                        className="cancel-order-btn"
                        onClick={() => handleCancelOrder(order.orderId)}
                      >
                        <FiXCircle />
                        Cancel Order
                      </button>
                    )}
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
