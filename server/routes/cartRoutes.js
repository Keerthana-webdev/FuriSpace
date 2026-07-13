const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { addToCart, getCart, updateCartItem, removeCartItem } = require("../controllers/cartController");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.put("/:productId", protect, updateCartItem);
router.delete("/:productId", protect, removeCartItem);

module.exports = router;