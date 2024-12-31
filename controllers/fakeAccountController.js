const db = require("../config/db");
const util = require("util");

const query = util.promisify(db.query).bind(db);

exports.getFakeAccount = async (req, res) => {
  const { fullName, phoneNumber } = req.body;
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  if (!fullName || !phoneNumber) {
    return res.status(400).json({
      message: "Full Name and phone number are required",
    });
  }

  try {
    const queryFakeAccounts =
      "SELECT * FROM fake_accounts WHERE name LIKE ? AND phone_number = ?";
    const querySociaMediaCheck =
      "SELECT * FROM social_media_check WHERE user_id = ?";
    const queryPersonalCheck = "SELECT * FROM personal_check WHERE user_id = ?";

    // INFO: Query for Fake Accounts
    const fakeAccountResults = await query(queryFakeAccounts, [
      fullName,
      phoneNumber,
    ]);
    if (fakeAccountResults.length === 0) {
      return res.status(404).json({ message: "No Fake Account Found" });
    }

    const userId = fakeAccountResults[0].id;

    // INFO: query for Social Media Check
    const sosialMediaCheckResults = await query(querySociaMediaCheck, [userId]);

    // INFO: Query for Personal Check
    const personalCheckResults = await query(queryPersonalCheck, [userId]);

    res.status(200).json({
      data: {
        fake_accounts: fakeAccountResults[0],
        sosial_media_check: sosialMediaCheckResults[0],
        personal_check: personalCheckResults[0],
      },
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
