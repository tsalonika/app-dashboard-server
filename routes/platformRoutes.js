const express = require("express");
const { getPlatform } = require("../controllers/platformController");

const router = express.Router();

router.get("/", getPlatform);

module.exports = router;
