const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { placeOrder } = require("../controllers/orderController");

router.post("/", protect, placeOrder);

module.exports = router;
