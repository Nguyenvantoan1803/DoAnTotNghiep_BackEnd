const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  
  email: { type: String, unique: true },
  username: {type: String, unique: true},
  password: { type: String },
  cv: {type: String},
  isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model("user", userSchema);