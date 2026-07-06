const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes=require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to FurniSpace Backend");
});

module.exports = app;