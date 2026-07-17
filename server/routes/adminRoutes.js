const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const { adminDashboard } = require("../controllers/adminController");

router.get(
    "/dashboard",
    protect,
    adminOnly,
    adminDashboard
);

module.exports = router;