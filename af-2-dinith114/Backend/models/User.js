const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [String], // country codes
});

module.exports = mongoose.model("User", UserSchema);
