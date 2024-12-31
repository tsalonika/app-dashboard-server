const express = require("express");
const { getAccountType } = require("../controllers/accountTypeController");

const router = express.Router();

router.get("/", getAccountType);

module.exports = router;
