const express = require("express");
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")

const PORT = 5000;

app.set("view engine", "ejs");

connectDB();
app.use(cors())
app.options('*', cors())

app.use(express.json());
app.use(cookieParser());

// Routes
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
