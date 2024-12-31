const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = require("./config/db");
const loginRoutes = require("./routes/loginRoutes");
const accountTypeRoutes = require("./routes/accountTypeRoutes");
const platformRoutes = require("./routes/platformRoutes");
const realAccountRoutes = require("./routes/realAccountRoutes");
const fakeAccountRoutes = require("./routes/fakeAccountRoutes");
// const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 3023;

// INFO: Handle Cors Error
app.use(cors({ origin: "http://localhost:3000" }));

// INFO: THIS IS FOR MIDDLEWARE
app.use(bodyParser.json());

// INFO: THIS IS FOR ROUTES
app.use("/api/login", loginRoutes);
app.use("/api/accountType", accountTypeRoutes);
app.use("/api/platform", platformRoutes);
app.use("/api/realAccount", realAccountRoutes);
app.use("/api/fakeAccount", fakeAccountRoutes);
// app.use("/api/users", userRoutes);

// INFO: THIS IS FOR START THE SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
