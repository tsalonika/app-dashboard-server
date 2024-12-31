const db = require("../config/db");

exports.getAccountType = (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const query = "SELECT * FROM accounttype";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No Account Type Found" });
    }

    res.status(200).json({ data: results });
  });
};
