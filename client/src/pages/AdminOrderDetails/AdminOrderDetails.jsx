import { useEffect, useState } from "react";

import {
  FiArrowLeft,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiMail,
  FiUser,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";

import { useNavigate, useParams } from "react-router-dom";

import "./AdminOrderDetails.css";

function AdminOrderDetails() {
  const navigate = useNavigate();

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState("1");

  const [updating, setUpdating] = useState(false);

  const [message, setMessage] = useState("");

  // ==========================================
  // LOAD ORDER
  // ==========================================

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = () => {
    try {
      const savedOrders = localStorage.getItem("orders");

      if (!savedOrders) {
        setOrder(null);
        setLoading(false);
        return;
      }

      const parsedOrders = JSON.parse(savedOrders);

      if (!Array.isArray(parsedOrders)) {
        setOrder(null);
        setLoading(false);
        return;
      }

      const foundOrder = parsedOrders.find(
        (item) => String(item.orderId) === String(orderId),
      );

      if (foundOrder) {
        setOrder(foundOrder);

        setSelectedStatus(String(foundOrder.statusStep || 1));
      } else {
        setOrder(null);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading order:", error);

      setOrder(null);

      setLoading(false);
    }
  };

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateOrderStatus = () => {
    if (!order) {
      return;
    }

    try {
      setUpdating(true);

      const savedOrders = localStorage.getItem("orders");

      if (!savedOrders) {
        setUpdating(false);
        return;
      }

      const parsedOrders = JSON.parse(savedOrders);

      if (!Array.isArray(parsedOrders)) {
        setUpdating(false);
        return;
      }

      const statusMap = {
        1: "Order Placed",
        2: "Order Confirmed",
        3: "Shipped",
        4: "Delivered",
      };

      const newStatus = statusMap[selectedStatus] || "Order Placed";

      const updatedOrders = parsedOrders.map((item) => {
        if (String(item.orderId) === String(orderId)) {
          return {
            ...item,
            statusStep: Number(selectedStatus),
            status: newStatus,
            updatedAt: new Date().toISOString(),
          };
        }

        return item;
      });

      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      const updatedOrder = updatedOrders.find(
        (item) => String(item.orderId) === String(orderId),
      );

      setOrder(updatedOrder);

      setMessage(`Order status updated to "${newStatus}"`);

      setUpdating(false);

      // Remove success message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);

      // Notify other pages/components
      window.dispatchEvent(new Event("ordersUpdated"));
    } catch (error) {
      console.error("Error updating order status:", error);

      setUpdating(false);

      setMessage("Failed to update order status.");
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="admin-order-details-page">
        <div className="admin-order-details-loading">
          <FiPackage />

          <h2>Loading Order...</h2>
        </div>
      </main>
    );
  }

  // ==========================================
  // ORDER NOT FOUND
  // ==========================================

  if (!order) {
    return (
      <main className="admin-order-details-page">
        <div className="admin-order-not-found">
          <FiPackage />

          <h2>Order Not Found</h2>

          <p>The order you are looking for does not exist.</p>

          <button onClick={() => navigate("/admin/orders")}>
            Back to Orders
          </button>
        </div>
      </main>
    );
  }

  // ==========================================
  // ORDER VALUES
  // ==========================================

  const totalItems =
    order.items?.reduce(
      (total, item) => total + Number(item.quantity || 1),
      0,
    ) || 0;

  const subtotal = Number(order.subtotal || 0);

  const deliveryCharge = Number(order.deliveryCharge || 0);

  const totalAmount = Number(order.totalAmount || 0);

  const currentStep = Number(order.statusStep || 1);

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  return (
    <main className="admin-order-details-page">
      <div className="admin-order-details-container">
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="admin-order-details-header">
          <button
            className="admin-back-btn"
            onClick={() => navigate("/admin/orders")}
          >
            <FiArrowLeft />
            Back to Orders
          </button>

          <div>
            <h1>Order #{order.orderId}</h1>

            <p>Placed on {orderDate}</p>
          </div>
        </div>

        <div className="admin-order-status-card">
          <div className="status-card-left">
            <div className="status-card-icon">
              <FiTruck />
            </div>

            <div>
              <span>Current Order Status</span>

              <strong>{order.status || "Order Placed"}</strong>
            </div>
          </div>

          <div className="status-step">Step {currentStep} of 4</div>
        </div>

        <section className="admin-details-card admin-status-update-card">
          <div className="admin-details-title">
            <FiRefreshCw />

            <div>
              <h2>Update Order Status</h2>

              <p>Change the current status of this order</p>
            </div>
          </div>

          <div className="status-update-content">
            <div className="status-select-wrapper">
              <label htmlFor="order-status">Order Status</label>

              <select
                id="order-status"
                value={selectedStatus}
                onChange={(event) => setSelectedStatus(event.target.value)}
              >
                <option value="1">Order Placed</option>
                <option value="2">Order Confirmed</option>
                <option value="3">Shipped</option>
                <option value="4">Delivered</option>
              </select>
            </div>

            <button
              className="update-status-btn"
              onClick={updateOrderStatus}
              disabled={updating || Number(selectedStatus) === currentStep}
            >
              {updating ? (
                <>
                  <FiRefreshCw className="spinning-icon" />
                  Updating...
                </>
              ) : (
                <>
                  <FiCheck />
                  Update Status
                </>
              )}
            </button>
          </div>

          {message && (
            <div
              className={`status-update-message ${
                message.includes("Failed") ? "error" : "success"
              }`}
            >
              <FiCheckCircle />

              <span>{message}</span>
            </div>
          )}
        </section>

        <div className="admin-order-details-grid">
          {/* CUSTOMER */}

          <section className="admin-details-card">
            <div className="admin-details-title">
              <FiUser />

              <div>
                <h2>Customer Information</h2>

                <p>Customer contact details</p>
              </div>
            </div>

            <div className="customer-details">
              <div className="detail-item">
                <FiUser />

                <div>
                  <span>Name</span>

                  <strong>
                    {order.customer?.fullName || "Unknown Customer"}
                  </strong>
                </div>
              </div>

              <div className="detail-item">
                <FiMail />

                <div>
                  <span>Email</span>

                  <strong>{order.customer?.email || "No email"}</strong>
                </div>
              </div>

              <div className="detail-item">
                <FiPhone />

                <div>
                  <span>Phone</span>

                  <strong>{order.customer?.phone || "No phone"}</strong>
                </div>
              </div>
            </div>
          </section>

          {/* ADDRESS */}

          <section className="admin-details-card">
            <div className="admin-details-title">
              <FiMapPin />

              <div>
                <h2>Delivery Address</h2>

                <p>Where the order should be delivered</p>
              </div>
            </div>

            <div className="address-details">
              <strong>{order.shippingAddress?.address || "No address"}</strong>

              <p>
                {order.shippingAddress?.city || ""}

                {order.shippingAddress?.city && order.shippingAddress?.state
                  ? ", "
                  : ""}

                {order.shippingAddress?.state || ""}
              </p>

              <p>Pincode: {order.shippingAddress?.pincode || "N/A"}</p>
            </div>
          </section>
        </div>

        <section className="admin-details-card admin-products-card">
          <div className="admin-details-title">
            <FiPackage />

            <div>
              <h2>Ordered Products</h2>

              <p>
                {totalItems} item
                {totalItems !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="admin-products-list">
            {order.items?.map((item, index) => {
              const image =
                item.images?.[0]?.url ||
                item.images?.[0] ||
                item.image ||
                "/placeholder.jpg";

              const price = Number(item.price || 0);

              const quantity = Number(item.quantity || 1);

              const itemTotal = price * quantity;

              return (
                <div
                  className="admin-product-row"
                  key={item._id || item.id || index}
                >
                  <img src={image} alt={item.name || "Furniture Product"} />

                  <div className="admin-product-info">
                    <strong>{item.name || "Furniture Product"}</strong>

                    <span>
                      ₹{price.toLocaleString("en-IN")} × {quantity}
                    </span>
                  </div>

                  <strong className="admin-product-total">
                    ₹{itemTotal.toLocaleString("en-IN")}
                  </strong>
                </div>
              );
            })}
          </div>
        </section>

        <section className="admin-details-card admin-summary-card">
          <div className="admin-details-title">
            <FiCheckCircle />

            <div>
              <h2>Order Summary</h2>

              <p>Payment and order total</p>
            </div>
          </div>

          <div className="admin-summary-details">
            <div>
              <span>Items</span>

              <strong>{totalItems}</strong>
            </div>

            <div>
              <span>Subtotal</span>

              <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
            </div>

            <div>
              <span>Delivery</span>

              <strong>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge.toLocaleString("en-IN")}`}
              </strong>
            </div>

            <hr />

            <div className="admin-summary-total">
              <span>Total Amount</span>

              <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </section>

        <div className="admin-details-footer">
          <button
            className="admin-back-orders-btn"
            onClick={() => navigate("/admin/orders")}
          >
            <FiArrowLeft />
            Back to All Orders
          </button>
        </div>
      </div>
    </main>
  );
}

export default AdminOrderDetails;
