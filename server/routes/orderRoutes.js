const express = require("express");

const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const { placeOrder, getMyOrders, getOrderById, cancelOrder, getAllOrders } = require("../controllers/orderController");

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:orderId", protect, getOrderById);
router.put("/:orderId/cancel", protect, cancelOrder);
router.get("/", protect, adminOnly, getAllOrders);

module.exports = router;
