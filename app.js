const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const errorHandlers = require("./handlers/errorHandlers");
const ignoreFavicon = require("./handlers/ignoreFavicon");
const { reviveDates } = require("./lib/dateReviver");
const mongoose = require("mongoose");

// Mongoose configuration
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// create our Express app
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

app.use(
  bodyParser.json({
    reviver: reviveDates,
    limit: "15mb",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// Ignore favicon
app.use(ignoreFavicon.ignore);

// After allllll that above middleware, we finally handle our own routes!
app.use("/", routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get("env") === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
