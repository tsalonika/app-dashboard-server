// const db = require("../config/db");

// exports.getUsers = (req, res) => {
//   const { username, accountType, platformId } = req.body;
//   const query =
//     "SELECT * FROM useraccount WHERE username = ? AND account_type_id = ? AND platform_id = ? LIMIT 1";
//   db.query(query, [username, accountType, platformId], (err, results) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     res.status(200).json(results[0]);
//   });
// };
