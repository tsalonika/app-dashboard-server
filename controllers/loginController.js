const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // INFO: Generate Token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login Successful", token });
  });
};
