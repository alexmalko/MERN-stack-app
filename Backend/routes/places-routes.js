const express = require("express");
// library to validate user inputs
const { check } = require("express-validator");

// imports routes logic
const placesControllers = require("../controllers/places-controllers");

// middleware for routes
const router = express.Router();

// go to the route specified in the app.js prepend in this case /api/places/id which is dynamic based on what user entered. Forst argument is the path, second is the middleware
router.get("/:pid", placesControllers.getPlacesById);

// user/uid route
router.get("/user/:uid", placesControllers.getPlacesByUserId);

// post request route
router.post(
  "/",
  [check("title").not().isEmpty(), check("address").isLength({ min: 5 })],
  placesControllers.createPlace
);

// update places route
router.patch(
  "/:pid",
  [check("title").not().isEmpty(), check("location").not().isEmpty()],
  placesControllers.updatePlace
);

// delete places route
router.delete("/:pid", placesControllers.deletePlace);

// exporting module (as a single file) so can be used in the app.js file
module.exports = router;
