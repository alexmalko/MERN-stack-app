const express = require("express");
// middleware to parse form data
const bodyParser = require("body-parser");

// import routes from the places-routes file
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
// error handling class
const HttpError = require("./models/http-error");

// use express object
const app = express();

// adding body-parser
app.use(bodyParser.json());

// .use serves all the req, res throught the placesRoutes middleware
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

// middleware for the unreachables URLS
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// error handling middleware => this middleware will execute when there is an error in the request
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "And unknown error occured" });
});

// create a server on port 5000
app.listen(5000);
