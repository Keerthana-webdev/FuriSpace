const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { addToCart, getCart, updateCartItem } = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:productId", protect, updateCartItem);

module.exports = router;