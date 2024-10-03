const express = require("express");
const { googleAuth } = require("../controllers/auth");
const router = express.Router();

router.get("/", googleAuth);

module.exports = router;
