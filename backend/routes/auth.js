const express = require("express");
const { login, signup, getUser } = require("../controllers/auth");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.get("/user", authMiddleware, getUser);

module.exports = router;
