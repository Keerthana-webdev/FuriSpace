import { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  useEffect(() => {
    loadOrders();
  }, []);

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
  // STATISTICS
  // ==========================================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => Number(order.statusStep || 1) < 4,
  ).length;

  const shippedOrders = orders.filter(
    (order) => Number(order.statusStep) === 3,
  ).length;

  const deliveredOrders = orders.filter(
    (order) => Number(order.statusStep) === 4,
  ).length;

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0,
  );

  // ==========================================
  // RECENT ORDERS
  // ==========================================

  const recentOrders = orders
    .slice()
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 5);

  // ==========================================
  // STATUS
  // ==========================================

  const getStatusClass = (step) => {
    if (Number(step) === 1) {
      return "dashboard-status status-placed";
    }

    if (Number(step) === 2) {
      return "dashboard-status status-confirmed";
    }

    if (Number(step) === 3) {
      return "dashboard-status status-shipped";
    }

    if (Number(step) === 4) {
      return "dashboard-status status-delivered";
    }

    return "dashboard-status status-placed";
  };

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        {/* HEADER */}

        <div className="admin-dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>

            <p>Welcome back! Here's what's happening with your store.</p>
          </div>

          <button
            className="manage-orders-header-btn"
            onClick={() => navigate("/admin/orders")}
          >
            Manage Orders
            <FiArrowRight />
          </button>
        </div>

        {/* STATISTICS */}

        <div className="dashboard-stats">
          {/* TOTAL ORDERS */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <FiPackage />
            </div>

            <div>
              <span>Total Orders</span>

              <strong>{totalOrders}</strong>
            </div>
          </div>

          {/* PENDING */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <FiClock />
            </div>

            <div>
              <span>Pending Orders</span>

              <strong>{pendingOrders}</strong>
            </div>
          </div>

          {/* SHIPPED */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <FiTruck />
            </div>

            <div>
              <span>Shipped</span>

              <strong>{shippedOrders}</strong>
            </div>
          </div>

          {/* DELIVERED */}

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <FiCheckCircle />
            </div>

            <div>
              <span>Delivered</span>

              <strong>{deliveredOrders}</strong>
            </div>
          </div>
        </div>

        {/* REVENUE */}

        <div className="dashboard-revenue-card">
          <div className="revenue-icon">
            <FiDollarSign />
          </div>

          <div className="revenue-content">
            <span>Total Revenue</span>

            <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* RECENT ORDERS */}

        <div className="recent-orders-section">
          <div className="recent-orders-header">
            <div>
              <h2>Recent Orders</h2>

              <p>Latest customer orders</p>
            </div>

            <button
              className="view-all-orders-btn"
              onClick={() => navigate("/admin/orders")}
            >
              View All
              <FiArrowRight />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="dashboard-empty">
              <FiPackage />

              <h3>No Orders Yet</h3>

              <p>Customer orders will appear here after they place an order.</p>
            </div>
          ) : (
            <div className="recent-orders-table-wrapper">
              <table className="recent-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => {
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
                      <tr key={order.orderId}>
                        <td>
                          <strong>#{order.orderId}</strong>
                        </td>

                        <td>
                          <div className="dashboard-customer">
                            <strong>
                              {order.customer?.fullName || "Unknown"}
                            </strong>

                            <span>{order.customer?.email || "No email"}</span>
                          </div>
                        </td>

                        <td>{orderDate}</td>

                        <td>{totalItems}</td>

                        <td>
                          <strong>
                            ₹
                            {Number(order.totalAmount || 0).toLocaleString(
                              "en-IN",
                            )}
                          </strong>
                        </td>

                        <td>
                          <span className={getStatusClass(order.statusStep)}>
                            {order.status || "Order Placed"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
