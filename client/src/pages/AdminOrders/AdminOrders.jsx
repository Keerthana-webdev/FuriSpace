import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiCheckCircle, FiPackage, FiTruck, FiUser } from "react-icons/fi";

import "./AdminOrders.css";

function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
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
      console.error("Error loading admin orders:", error);
      setOrders([]);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    let newStatusStep = 1;

    if (newStatus === "Order Placed") {
      newStatusStep = 1;
    }

    if (newStatus === "Order Confirmed") {
      newStatusStep = 2;
    }

    if (newStatus === "Shipped") {
      newStatusStep = 3;
    }

    if (newStatus === "Delivered") {
      newStatusStep = 4;
    }

    try {
      const updatedOrders = orders.map((order) => {
        if (String(order.orderId) === String(orderId)) {
          return {
            ...order,
            status: newStatus,
            statusStep: newStatusStep,
            updatedAt: new Date().toISOString(),
          };
        }

        return order;
      });

      setOrders(updatedOrders);

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      alert(`Order status updated to "${newStatus}"`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDeleteOrder = (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const updatedOrders = orders.filter(
        (order) => String(order.orderId) !== String(orderId),
      );

      setOrders(updatedOrders);

      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => Number(order.statusStep) === 4,
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
        {/* HEADER */}

        <div className="admin-orders-header">
          <div>
            <h1>Order Management</h1>

            <p>Manage customer orders and update delivery status.</p>
          </div>
        </div>

        {/* STATISTICS */}

        <div className="admin-order-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FiPackage />
            </div>

            <div>
              <span>Total Orders</span>

              <strong>{totalOrders}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FiTruck />
            </div>

            <div>
              <span>Pending</span>

              <strong>{pendingOrders}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <FiCheckCircle />
            </div>

            <div>
              <span>Delivered</span>

              <strong>{deliveredOrders}</strong>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">₹</div>

            <div>
              <span>Total Revenue</span>

              <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {/* ORDERS */}

        {orders.length === 0 ? (
          <div className="admin-orders-empty">
            <FiPackage />

            <h2>No Orders Yet</h2>

            <p>Customer orders will appear here.</p>
          </div>
        ) : (
          <div className="admin-orders-list">
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
                  ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A";

                return (
                  <div className="admin-order-card" key={order.orderId}>
                    {/* ORDER HEADER */}

                    <div className="admin-order-top">
                      <div>
                        <h2>Order #{order.orderId}</h2>

                        <p>Placed on {orderDate}</p>
                      </div>

                      <div className="admin-order-total">
                        <span>Total</span>

                        <strong>
                          ₹
                          {Number(order.totalAmount || 0).toLocaleString(
                            "en-IN",
                          )}
                        </strong>
                      </div>
                    </div>

                    {/* CUSTOMER */}

                    <div className="admin-customer">
                      <div className="admin-customer-icon">
                        <FiUser />
                      </div>

                      <div>
                        <strong>
                          {order.customer?.fullName || "Unknown Customer"}
                        </strong>

                        <p>{order.customer?.email || "No email"}</p>

                        <p>{order.customer?.phone || "No phone"}</p>
                      </div>
                    </div>

                    {/* PRODUCTS */}

                    <div className="admin-order-products">
                      {order.items?.map((item, index) => {
                        const image =
                          item.images?.[0]?.url ||
                          item.images?.[0] ||
                          item.image ||
                          "/placeholder.jpg";

                        return (
                          <div
                            className="admin-order-product"
                            key={item._id || item.id || index}
                          >
                            <img src={image} alt={item.name || "Product"} />

                            <div>
                              <strong>
                                {item.name || "Furniture Product"}
                              </strong>

                              <span>Qty: {Number(item.quantity || 1)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* ORDER INFO */}

                    <div className="admin-order-info">
                      <div>
                        <span>Items</span>

                        <strong>{totalItems}</strong>
                      </div>

                      <div>
                        <span>Current Status</span>

                        <strong
                          className={`admin-status status-${Number(
                            order.statusStep || 1,
                          )}`}
                        >
                          {order.status || "Order Placed"}
                        </strong>
                      </div>
                    </div>

                    {/* STATUS CONTROL */}

                    <div className="admin-status-control">
                      <label>Update Order Status</label>

                      <select
                        value={order.status || "Order Placed"}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                      >
                        <option value="Order Placed">Order Placed</option>

                        <option value="Order Confirmed">Order Confirmed</option>

                        <option value="Shipped">Shipped</option>

                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>

                    {/* ACTIONS */}

                    <div className="admin-order-actions">
                      <button
                        className="admin-view-details-btn"
                        onClick={() =>
                          navigate(`/admin/orders/${order.orderId}`)
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="admin-delete-btn"
                        onClick={() => handleDeleteOrder(order.orderId)}
                      >
                        Delete Order
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </main>
  );
}

export default AdminOrders;
