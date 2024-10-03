const jwt = require("jsonwebtoken");

const catchAsync = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch((err) => {
      return next(err);
    });
  };
};

const signToken = (obj) => {
  const token = jwt.sign({ obj }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};

const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isPassword = (password) => {
  return password.length >= 8;
};

module.exports = { signToken, catchAsync, isPassword, isEmail };
