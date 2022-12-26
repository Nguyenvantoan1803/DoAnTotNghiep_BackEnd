const express = require("express");
const connectDB = require("./db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")
require('dotenv').config();
const userRouter = require('./routes/user')
const jobRouter = require('./routes/jobs')

app.set("view engine", "ejs");

connectDB();
app.use(cors())
app.options('*', cors())
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRouter);
app.use('/api/job', jobRouter);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server Connected to port ${process.env.PORT}`)
);

app.get("/", (req, res, next) => {
  var route, routes = [];

  app._router.stack.forEach(function(middleware){
      if(middleware.route){ // routes registered directly on the app
          routes.push(middleware.route);
      } else if(middleware.name === 'router'){ // router middleware 
          middleware.handle.stack.forEach(function(handler){
              route = handler.route;
              route && routes.push(route);
          });
      }
  });

  res.send('<h1>List of routes.</h1>' + JSON.stringify(routes));
});


process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});


