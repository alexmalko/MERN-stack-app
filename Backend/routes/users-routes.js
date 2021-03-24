const express = require("express");
// library to validate user inputs
const { check } = require("express-validator");

// imports routes logic
const usersControllers = require("../controllers/users-controller");

// middleware for routes
const router = express.Router();

// go to the route specified in the app.js prepend in this case /api/places/id which is dynamic based on what user entered.
// req, res, next => next will pass the req/res to the next middleware
router.get("/", usersControllers.getUsers);

// post request route with validation logic
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

// update places route
router.post("/login", usersControllers.login);

// exporting module (as a single file) so can be used in the app.js file
module.exports = router;
