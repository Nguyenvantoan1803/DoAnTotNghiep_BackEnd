const express = require("express");
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
require('dotenv').config();

const userRouter = require('./routes/user')

app.set("view engine", "ejs");

connectDB();
app.use(cors())
app.options('*', cors())
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);



const server = app.listen(process.env.PORT, () =>
  console.log(`Server Connected to port ${process.env.PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});


