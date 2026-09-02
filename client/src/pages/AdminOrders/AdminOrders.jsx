import { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./AdminOrders.css";

function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  // =====================================================
  // LOAD ORDERS
  // =====================================================

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

  const handleStatusChange = (orderId, newStatus) => {
    let statusStep = 1;

    if (newStatus === "Order Confirmed") {
      statusStep = 2;
    }

    if (newStatus === "Shipped") {
      statusStep = 3;
    }

    if (newStatus === "Delivered") {
      statusStep = 4;
    }

    const updatedOrders = orders.map((order) => {
      if (String(order.orderId) === String(orderId)) {
        return {
          ...order,
          status: newStatus,
          statusStep: statusStep,
          updatedAt: new Date().toISOString(),
        };
      }

      return order;
    });

    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleDeleteOrder = (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmed) {
      return;
    }

    const updatedOrders = orders.filter(
      (order) => String(order.orderId) !== String(orderId),
    );

    setOrders(updatedOrders);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const getStatusClass = (statusStep) => {
    const step = Number(statusStep || 1);

    if (step === 2) {
      return "admin-status admin-status-confirmed";
    }

    if (step === 3) {
      return "admin-status admin-status-shipped";
    }

    if (step === 4) {
      return "admin-status admin-status-delivered";
    }

    return "admin-status admin-status-placed";
  };

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => Number(order.statusStep || 1) === 4,
  ).length;

  const pendingOrders = orders.filter(
    (order) => Number(order.statusStep || 1) < 4,
  ).length;

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0,
  );

  return (
    <main className="admin-orders-page">
      <div className="admin-orders-container">
        <div className="admin-orders-header">
          <div>
            <h1>Manage Orders</h1>

            <p>View and manage all customer orders.</p>
          </div>

          <button
            className="admin-dashboard-btn"
            onClick={() => navigate("/admin")}
          >
            Dashboard
            <FiArrowRight />
          </button>
        </div>

        <div className="admin-orders-stats">
          <div className="admin-orders-stat-card">
            <div className="admin-orders-stat-icon">
              <FiPackage />
            </div>

            <div>
              <span>Total Orders</span>
              <strong>{totalOrders}</strong>
            </div>
          </div>

          <div className="admin-orders-stat-card">
            <div className="admin-orders-stat-icon">
              <FiClock />
            </div>

            <div>
              <span>Pending</span>
              <strong>{pendingOrders}</strong>
            </div>
          </div>

          <div className="admin-orders-stat-card">
            <div className="admin-orders-stat-icon">
              <FiCheckCircle />
            </div>

            <div>
              <span>Delivered</span>
              <strong>{deliveredOrders}</strong>
            </div>
          </div>

          <div className="admin-orders-stat-card">
            <div className="admin-orders-stat-icon">
              <FiTruck />
            </div>

            <div>
              <span>Revenue</span>
              <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        <div className="admin-orders-card">
          <div className="admin-orders-card-header">
            <div>
              <h2>All Orders</h2>

              <p>
                {totalOrders} order
                {totalOrders !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="admin-orders-empty">
              <FiPackage />

              <h3>No Orders Yet</h3>

              <p>Customer orders will appear here after they place an order.</p>
            </div>
          ) : (
            <div className="admin-orders-table-wrapper">
              <table className="admin-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders
                    .slice()
                    .reverse()
                    .map((order) => {
                      const totalItems =
                        order.items?.reduce(
                          (total, item) => total + Number(item.quantity || 1),
                          0,
                        ) || 0;

                      const orderDate = order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "N/A";

                      return (
                        <tr key={order.orderId}>
                          {/* ORDER ID */}

                          <td>
                            <button
                              className="admin-order-id-btn"
                              onClick={() =>
                                navigate(`/admin/orders/${order.orderId}`)
                              }
                            >
                              #{order.orderId}
                            </button>
                          </td>

                          {/* CUSTOMER */}

                          <td>
                            <div className="admin-customer">
                              <strong>
                                {order.customer?.fullName || "Unknown Customer"}
                              </strong>

                              <span>{order.customer?.email || "No email"}</span>
                            </div>
                          </td>

                          {/* DATE */}

                          <td>{orderDate}</td>

                          {/* ITEMS */}

                          <td>{totalItems}</td>

                          {/* AMOUNT */}

                          <td>
                            <strong>
                              ₹
                              {Number(order.totalAmount || 0).toLocaleString(
                                "en-IN",
                              )}
                            </strong>
                          </td>

                          {/* STATUS */}

                          <td>
                            <select
                              className={getStatusClass(order.statusStep)}
                              value={order.status || "Order Placed"}
                              onChange={(event) =>
                                handleStatusChange(
                                  order.orderId,
                                  event.target.value,
                                )
                              }
                            >
                              <option value="Order Placed">Order Placed</option>

                              <option value="Order Confirmed">
                                Order Confirmed
                              </option>

                              <option value="Shipped">Shipped</option>

                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>

                          {/* ACTIONS */}

                          <td>
                            <div className="admin-order-actions">
                              <button
                                className="admin-view-order-btn"
                                onClick={() =>
                                  navigate(`/admin/orders/${order.orderId}`)
                                }
                              >
                                View
                                <FiArrowRight />
                              </button>

                              <button
                                className="admin-delete-order-btn"
                                onClick={() => handleDeleteOrder(order.orderId)}
                                title="Delete Order"
                              >
                                <FiTrash2 />
                              </button>
                            </div>
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

export default AdminOrders;
