const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5001, () => console.log("Server running on port 5001"))
  )
  .catch((err) => console.error("MongoDB connection error:", err));
