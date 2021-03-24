const express = require("express");

const placesControllers = require("../controllers/places-controllers");

// middleware for routes
const router = express.Router();

// go to the route specified in the app.js prepend in this case /api/places/id which is dynamic based on what user entered.
// req, res, next => next will pass the req/res to the next middleware
router.get("/:pid", placesControllers.getPlaceById);

// user/uid route
router.get("/user/:uid", placesControllers.getUserById);

// post request route
router.post("/", placesControllers.createPlace);

// update places route
router.delete("/:pid", placesControllers.updatePlase);

// delete places route
router.delete("/:pid", placesControllers.deletePlace);

// exporting module (as a single file) so can be used in the app.js file
module.exports = router;
