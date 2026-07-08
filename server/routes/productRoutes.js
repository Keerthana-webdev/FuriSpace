const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");
const { createProduct ,getProducts ,getProductById ,updateProduct} = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, adminOnly, upload.array("images", 5), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, adminOnly, updateProduct);

module.exports = router;