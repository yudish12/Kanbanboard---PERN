const User = require("../models/User");
const { isEmail, isPassword, catchAsync, signToken } = require("../utils");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const oauth2Client = require("../utils/google-oauth");
const AppError = require("../utils/appError");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!isEmail(email) || !isPassword(password)) {
    const err = new AppError(
      "Please enter valid email and password",
      404,
      "INVALID_FIELDS"
    );
    return next(err);
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    const err = new AppError("User not found", 404, "USER_NOT_FOUND");
    return next(err);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const err = new AppError("Incorrect password", 401, "INCORRECT_PASSWORD");
    return next(err);
  }

  const token = signToken(
    { email, first_name: user.first_name },
    process.env.JWT_SECRET
  );
  return res.status(200).json({ token, user, success: true });
});

const signup = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!isEmail(email) || !isPassword(password)) {
    const err = new AppError(
      "Please enter valid email and password",
      404,
      "INVALID_FIELDS"
    );
    return next(err);
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    const err = new AppError("User already exists", 400, "USER_EXISTS");
    return next(err);
  }

  const user_new = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = signToken(
    { email, first_name: user_new.first_name },
    process.env.JWT_SECRET
  );
  return res.status(200).json({ token, user: user_new });
});

const getUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({ data: user, success: true });
});

const googleAuth = catchAsync(async (req, res, next) => {
  const code = req.query.code;
  console.log("USER CREDENTIAL -> ", code);

  const googleRes = await oauth2Client.oauth2Client.getToken(code);

  oauth2Client.oauth2Client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
  );

  console.log(userRes.data, 88);

  let userData = await User.findOne({ where: { email: userRes.data.email } });
  console.log(userData, 91);
  if (!userData) {
    console.log("New User found");
    userData = await User.create({
      first_name: userRes.data.name,
      last_name: userRes.data.name,
      email: userRes.data.email,
      password: uuidv4(),
    });
  }
  const token = signToken(
    { email: userRes.data.email, first_name: userRes.data.name },
    process.env.JWT_SECRET
  );
  return res.status(200).json({ token, user: userData, success: true });
});

module.exports = { login, signup, getUser, googleAuth };
