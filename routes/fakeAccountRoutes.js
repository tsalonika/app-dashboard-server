const express = require("express");
const { getFakeAccount } = require("../controllers/fakeAccountController");

const router = express.Router();

router.post("/", getFakeAccount);

module.exports = router;
