class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

// exporting module so can be used in the app.js file
module.exports = HttpError;
