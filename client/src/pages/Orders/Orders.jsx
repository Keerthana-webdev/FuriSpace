import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";

import "./Orders.css";

function Orders() {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem("lastOrder");

      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
      }
    } catch (error) {
      console.error("Error loading order:", error);
      setOrder(null);
    }
  }, []);

  if (!order) {
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

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date unavailable";

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
            <p>View your recent order details</p>
          </div>
        </div>

        {/* ORDER CARD */}
        <div className="order-card">
          {/* ORDER HEADER */}
          <div className="order-card-header">
            <div>
              <span className="order-label">Order</span>

              <h2>
                #
                {order.createdAt
                  ? order.createdAt.replace(/\D/g, "").slice(-8)
                  : "ORDER"}
              </h2>
            </div>

            <div className="order-status">
              <FiCheckCircle />
              <span>Order Placed</span>
            </div>
          </div>

          {/* ORDER INFO */}
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

                <strong>
                  {order.items?.reduce(
                    (total, item) => total + Number(item.quantity || 1),
                    0,
                  )}
                </strong>
              </div>
            </div>
          </div>

          {/* CUSTOMER INFORMATION */}
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
                <strong>City:</strong> {order.shippingAddress?.city || "N/A"}
              </p>

              <p>
                <strong>State:</strong> {order.shippingAddress?.state || "N/A"}
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
                    className="ordered-product"
                    key={item._id || item.id || index}
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

          {/* BOTTOM BUTTON */}
          <div className="order-footer">
            <button
              className="orders-continue-btn"
              onClick={() => navigate("/products")}
            >
              <FiShoppingBag />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Orders;
