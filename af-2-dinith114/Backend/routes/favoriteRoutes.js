const express = require("express");
const {
  getFavorites,
  toggleFavorite,
} = require("../controllers/favoriteController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, getFavorites);
router.post("/:code", auth, toggleFavorite);

module.exports = router;
