const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { placeOrder, getMyOrders, getOrderById } = require("../controllers/orderController");

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:orderId", protect, getOrderById);

module.exports = router;
