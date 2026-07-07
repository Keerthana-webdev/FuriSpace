const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/roleMiddleware");

const { createProduct } = require("../controllers/productController");

router.post("/", protect, adminOnly, createProduct);

module.exports = router;