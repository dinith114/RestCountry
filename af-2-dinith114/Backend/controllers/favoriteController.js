const User = require("../models/User");

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user.favorites || []);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching favorites" });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { code } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const exists = user.favorites.includes(code);
    let updatedFavorites;

    if (exists) {
      updatedFavorites = user.favorites.filter((fav) => fav !== code);
    } else {
      updatedFavorites = [...user.favorites, code];
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { favorites: updatedFavorites },
      { new: true }
    );

    return res.json(updatedUser.favorites);
  } catch (err) {
    console.error("SERVER ERROR in toggleFavorite:", err.message);
    return res.status(500).json({ msg: "Error updating favorites" });
  }
};


