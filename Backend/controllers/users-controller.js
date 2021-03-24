const uuid = require("uuid");

// error handling class
const HttpError = require("../models/http-error");

// dummy array of data for testing
let DUMMY_USERS = [
  {
    id: "p1",
    name: "Alex",
    email: "alex@alex.com",
    password: "1234",
  },
  {
    id: "p2",
    name: "Alex2",
    email: "alex@alex.com",
    password: "1234",
  },
  {
    id: "p3",
    name: "Alex3",
    email: "alex@alex.com",
    password: "1234",
  },
];

//GET ONE USER
const getUsers = (req, res, next) => {
  // respond with found object in JSON format
  res.json({ users: DUMMY_USERS });
};

// SIGNUP
const signup = (req, res, next) => {
  // get data from the user input
  const { id, name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Email already exists", 401);
  }
  // create new place
  const createUser = {
    id,
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createUser);

  res.status(201).json({ user: createUser });
};

// LOGIN
const login = (req, res, next) => {
  // get data from the user input
  const { email, password } = req.body;
  // create new place
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser) {
    throw new HttpError("Could not identify user credential", 401);
  }
  res.status(201).json({ message: "Logged in" });
};

// exporting multiple files
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
