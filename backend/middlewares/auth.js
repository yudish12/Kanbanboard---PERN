const { catchAsync } = require("../utils");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/User");

const authMiddleware = catchAsync(async (req, res, next) => {
  let token;

  // Check if the token is provided and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token, return an error
  if (!token) {
    return next(
      new AppError("You are not logged in or token provided is wrong", 401)
    );
  }

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find the user using the email from the token
  const user = await User.findOne({ where: { email: decoded.obj.email } });

  // If no user found, return an error
  if (!user) {
    return next(
      new AppError("You are not logged in or token provided is wrong", 401)
    );
  }

  // Attach the user to the request object
  req.user = user;

  // Pass control to the next middleware or route handler
  next();
});

module.exports = { authMiddleware };
