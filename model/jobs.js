const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({ 
  title: { type: String },
  img: {type: String},
  salary: { type: String },
  city: {type: String},
  district: {type: String},
  time: {type: Date, default: Date.now},
  tags: {type: Array},
  benefits: {type: Array},
  description: {type: String},
  idCompany: {type: String},
  isShow: {type: Boolean}
});

module.exports = mongoose.model("user", jobSchema);