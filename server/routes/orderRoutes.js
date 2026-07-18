const express = require("express");

const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { placeOrder, getMyOrders, getOrderById, cancelOrder, getAllOrders , updateOrderStatus } = require("../controllers/orderController");

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:orderId", protect, getOrderById);
router.put("/:orderId/cancel", protect, cancelOrder);
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:orderId/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
