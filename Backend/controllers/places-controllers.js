const uuid = require("uuid");
// library to validate user inputs
const { validationResult } = require("express-validator");

// error handling class
const HttpError = require("../models/http-error");
const getCoordinates = require("../util/location");

// dummy array of data for testing
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "USA",
    address: "belarus",
    creator: "u1",
    location: {
      coordinates: "hello",
    },
  },
  {
    id: "p2",
    title: "USA",
    address: "belarus",
    creator: "u1",
    location: {
      coordinates: "hello",
    },
  },
  {
    id: "p3",
    title: "USA",
    address: "belarus",
    creator: "u1",
    location: {
      coordinates: "hello",
    },
  },
];
// get one record
const getPlacesById = (req, res, next) => {
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
// get one user record
const getPlacesByUserId = (req, res, next) => {
  // extract ID from the url and store to userID variable
  const userId = req.params.uid;
  // return a list of places for the user
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  // error handling if place by id is not found
  if (!places) {
    return next(
      new HttpError("Could not find places for the provided ID", 404)
    );
  }
  res.json({ places });
};
// create a new place with a fetch request to a google API

const createPlace = async (req, res, next) => {
  // middleware to validate user inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalit inputs passed", 422));
  }
  // get data from the user input
  const { id, title, address, creator } = req.body;

  // fetch coordinates from the google API
  let coordinates;
  try {
    coordinates = await getCoordinates(address);
  } catch (error) {
    return next(error);
  }

  // create new place
  const createPlace = {
    id,
    title,
    address,
    location: coordinates,
    creator,
  };

  DUMMY_PLACES.push(createPlace);

  res.status(201).json({ place: createPlace });
};
// update existing place
const updatePlace = (req, res, next) => {
  // middleware to validate user inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalit inputs passed", 422);
  }
  // get data from the user input
  const { title, location } = req.body;
  // extract ID from the url and store to placeID variable
  const placeId = req.params.pid;
  // find extracted ID in the Dummy_Places array
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.location = location;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};
// delete a place
const deletePlace = (req, res, next) => {
  // extract ID from the url and store to placeID variable
  const placeId = req.params.pid;
  // check if place exist before trying to delete
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for the provided ID", 404);
  }
  //  delete specific record
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "record has been deleted" });
};

// exporting multiple files
exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
