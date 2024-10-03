const express = require("express");
const cors = require("cors");
require("dotenv").config();
const AppError = require("./utils/appError");
const { authMiddleware } = require("./middlewares/auth");
const globalErrorHandler = require("./middlewares/error");
const db = require("./utils/db");
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

app.use(cors());

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