const express = require("express");
const cors = require("cors");
require("dotenv").config();
const AppError = require("./utils/appError");
const { authMiddleware } = require("./middlewares/auth");
const globalErrorHandler = require("./middlewares/error");
const db = require("./utils/db");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { User, Task } = require("./models");

db.authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

db.sync().then(() => {
  console.log("Database & tables synced!");
});

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// clean xss inputs
app.use(xss());

//sets up various headers for protection from various attacks
app.use(helmet());

// rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests per window(can be increased due to reordering api maybe it can be called many times)
});
app.use(limiter);

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use("/api", require("./routes/auth"));
app.use("/auth/google", require("./routes/google-auth"));
app.use("/api/tasks", authMiddleware, require("./routes/tasks"));

// errors
app.all("*", (req, res, next) => {
  //AppError class for error handler object
  next(new AppError(`Cannot find route ${req.originalUrl} in the server`));
});

//error middle ware whenever first arg is err object it is error middleware
app.use(globalErrorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! ");
  server.close(() => {
    process.exit(1);
  });
});
