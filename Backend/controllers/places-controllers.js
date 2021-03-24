const uuid = require("uuid");

// error handling class
const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "USA",
    location: "belarus",
    creator: "u1",
  },
  {
    id: "p2",
    title: "minsk",
    location: "belarus",
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  // extract ID from the url and store to placeID variable
  const placeId = req.params.pid;
  // find extracted ID in the Dummy_Places array
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  // error handling if place by id is not found
  if (!place) {
    throw new HttpError("Could not fnd a place for the provided ID", 404);
  }
  // respond with found object in JSON format
  res.json({ place });
};

const getUserById = (req, res, next) => {
  // extract ID from the url and store to userID variable
  const userId = req.params.uid;

  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  // error handling if place by id is not found
  if (!place) {
    return next(
      new HttpError("Could not fnd a users for the provided ID", 404)
    );
  }
  res.json({ place });
};

const createPlace = (req, res, next) => {
  // get data from the user input
  const { id, title, location, creator } = req.body;
  // create new place
  const createPlace = {
    id,
    title,
    location,
    creator,
  };

  DUMMY_PLACES.push(createPlace);

  res.status(201).json({ place: createPlace });
};

const updatePlase = (req, res, next) => {
  // get data from the user input
  const { title, location } = req.body;
  // extract ID from the url and store to placeID variable
  const placeId = req.params.pid;
  // find extracted ID in the Dummy_Places array
  const updatedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
};

const deletePlace = (req, res, next) => {};

// exporting multple files
exports.getPlaceById = getPlaceById;
exports.getUserById = getUserById;
exports.createPlace = createPlace;
exports.updatePlase = updatePlase;
exports.deletePlace = deletePlace;
