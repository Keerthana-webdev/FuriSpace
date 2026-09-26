const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

// ROOT TEST
app.get("/", (req, res) => {
  res.send("Welcome to FurniSpace Backend");
});

app.get("/api/test", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FurniSpace backend is running correctly"
    });
});

module.exports = app;
