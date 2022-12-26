const Mongoose = require("mongoose");
Mongoose.set('strictQuery', false);
const connectDB = async () => {
  await Mongoose.connect(process.env.localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;