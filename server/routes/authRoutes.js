const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// REGISTER

router.post("/register", registerUser);

// LOGIN

router.post("/login", loginUser);

// PROFILE

router.get("/profile", protect, getProfile);

// ADMIN TEST

router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.status(200).json({
    success: true,

    message: "Admin access verified successfully.",

    user: {
      id: req.user._id,

      name: req.user.name,

      email: req.user.email,

      role: req.user.role,
    },
  });
});

module.exports = router;
