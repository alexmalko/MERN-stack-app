const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyBWNHOZFPpHLztcc5MZ3FT13jK6q_kH0AQ";

// getting location from Google API
async function getCoordinates(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status === "ZERP_RESULTS") {
    const error = new HttpError(
      HttpError("Could not find location for the specified address", 422)
    );
    throw error;
  }
  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordinates;