const express = require("express");
const { getRealAccount } = require("../controllers/realAccountController");

const router = express.Router();

router.post("/", getRealAccount);

module.exports = router;
