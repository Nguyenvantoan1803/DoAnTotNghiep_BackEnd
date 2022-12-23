const Mongoose = require("mongoose");

const localDB = `mongodb+srv://DoAnTotNghiep:vantoan090801@cluster0.9lzjhhz.mongodb.net/?retryWrites=true&w=majority`;
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;