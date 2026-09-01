import { useEffect, useState } from "react";

import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiShoppingBag,
  FiTruck,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./Orders.css";

function Orders() {
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
        const sortedOrders = parsedOrders
          .slice()
          .sort(
            (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
          );

        setOrders(sortedOrders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error loading orders:", error);

      setOrders([]);
    }
  };

  const getStatusClass = (step) => {
    const statusStep = Number(step) || 1;

    if (statusStep === 1) {
      return "orders-status orders-status-placed";
    }

    if (statusStep === 2) {
      return "orders-status orders-status-confirmed";
    }

    if (statusStep === 3) {
      return "orders-status orders-status-shipped";
    }

    if (statusStep === 4) {
      return "orders-status orders-status-delivered";
    }

    return "orders-status orders-status-placed";
  };

  const getStatusIcon = (step) => {
    const statusStep = Number(step) || 1;

    if (statusStep === 2) {
      return <FiCheckCircle />;
    }

    if (statusStep === 3) {
      return <FiTruck />;
    }

    if (statusStep === 4) {
      return <FiCheckCircle />;
    }

    return <FiClock />;
  };

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}`);
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

            <div className="orders-count">0 Orders</div>
          </div>

          <div className="orders-empty">
            <div className="orders-empty-icon">
              <FiPackage />
            </div>

            <h2>No Orders Yet</h2>

            <p>
              You haven't placed any orders yet. Start shopping to see your
              orders here.
            </p>

            <button
              className="start-shopping-btn"
              onClick={() => navigate("/products")}
            >
              <FiShoppingBag />
              Start Shopping
              <FiArrowRight />
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

          <div className="orders-count">
            {orders.length} {orders.length === 1 ? "Order" : "Orders"}
          </div>
        </div>

        {/* ORDERS LIST */}

        <div className="orders-list">
          {orders.map((order) => {
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
              : "Date unavailable";

            const totalAmount = Number(order.totalAmount || 0);

            const statusStep = Number(order.statusStep) || 1;

            return (
              <div className="order-card" key={order.orderId}>
                {/* ORDER CARD HEADER */}

                <div className="order-card-header">
                  <div className="order-id-section">
                    <span>Order ID</span>

                    <strong>#{order.orderId}</strong>
                  </div>

                  <div className={getStatusClass(statusStep)}>
                    {getStatusIcon(statusStep)}

                    <span>{order.status || "Order Placed"}</span>
                  </div>
                </div>

                {/* DIVIDER */}

                <div className="order-card-divider"></div>

                {/* ORDER INFORMATION */}

                <div className="order-card-info">
                  <div className="order-info-item">
                    <div className="order-info-icon">
                      <FiCalendar />
                    </div>

                    <div>
                      <span>Date</span>

                      <strong>{orderDate}</strong>
                    </div>
                  </div>

                  <div className="order-info-item">
                    <div className="order-info-icon">
                      <FiPackage />
                    </div>

                    <div>
                      <span>Items</span>

                      <strong>
                        {totalItems}
                        {totalItems === 1 ? " Item" : " Items"}
                      </strong>
                    </div>
                  </div>

                  <div className="order-info-item">
                    <div className="order-info-icon">
                      <FiShoppingBag />
                    </div>

                    <div>
                      <span>Total</span>

                      <strong>₹{totalAmount.toLocaleString("en-IN")}</strong>
                    </div>
                  </div>
                </div>

                {/* PRODUCTS PREVIEW */}

                {order.items && order.items.length > 0 && (
                  <div className="order-products-preview">
                    {order.items.slice(0, 3).map((item, index) => {
                      const image =
                        item.images?.[0]?.url ||
                        item.images?.[0] ||
                        item.image ||
                        "/placeholder.jpg";

                      return (
                        <div
                          className="order-product-preview"
                          key={item._id || item.id || index}
                        >
                          <img
                            src={image}
                            alt={item.name || "Furniture Product"}
                          />

                          <div>
                            <strong>{item.name || "Furniture Product"}</strong>

                            <span>Qty: {Number(item.quantity || 1)}</span>
                          </div>
                        </div>
                      );
                    })}

                    {order.items.length > 3 && (
                      <span className="more-products">
                        +{order.items.length - 3} more
                      </span>
                    )}
                  </div>
                )}

                {/* FOOTER */}

                <div className="order-card-footer">
                  <div className="order-status-message">
                    {statusStep === 4 ? (
                      <>
                        <FiCheckCircle />
                        <span>Your order has been delivered</span>
                      </>
                    ) : statusStep === 3 ? (
                      <>
                        <FiTruck />
                        <span>Your order is on the way</span>
                      </>
                    ) : statusStep === 2 ? (
                      <>
                        <FiCheckCircle />
                        <span>Your order has been confirmed</span>
                      </>
                    ) : (
                      <>
                        <FiClock />
                        <span>Your order has been placed</span>
                      </>
                    )}
                  </div>

                  <button
                    className="view-order-btn"
                    onClick={() => handleViewOrder(order.orderId)}
                  >
                    View Order
                    <FiArrowRight />
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
