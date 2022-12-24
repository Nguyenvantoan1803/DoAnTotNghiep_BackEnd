const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  email: { type: String, unique: true },
  companyname: {type: String},
  password: { type: String },
  jobs: {type: Array},
  quote: {type: String},
  logo: {type: String},
  address: {type: String},
  country: {type: String},
  day: {type: String},
  description: {type: Array},
  skills: {type: Array},
  reasons: {type: Array},
  benefits: {type: Array},
  rating: {type: Float32Array}
});

module.exports = mongoose.model("user", companySchema);