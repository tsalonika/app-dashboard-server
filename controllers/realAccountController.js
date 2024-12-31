const db = require("../config/db");
const util = require("util");

const query = util.promisify(db.query).bind(db);

exports.getRealAccount = async (req, res) => {
  const { username, media, startDate, endDate, currentDate } = req.body;
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  if (!username || !media || !startDate || !endDate || !currentDate) {
    return res.status(400).json({
      message:
        "Username, media, start date, end date, and current date are required",
    });
  }

  try {
    const queryRealAccount =
      "SELECT * FROM user_account WHERE username = ? AND media = ?";
    const queryDailyPostsAndEngagement =
      "SELECT * FROM daily_posts_and_engagement WHERE user_id = ? AND post_date BETWEEN ? AND ?";
    const queryPopularHashtag =
      "SELECT * FROM popularhashtag WHERE user_id = ? ORDER BY total DESC";
    const queryTopPosts =
      "SELECT * FROM user_posts WHERE user_id = ? ORDER BY total_likes DESC LIMIT 5";
    const queryPopularEmails =
      "SELECT * FROM most_popular_email WHERE user_id = ?";
    const queryPopularPhoneNumbers =
      "SELECT * FROM most_popular_phone_numbers WHERE user_id = ?";
    const queryPopularKeywords =
      "SELECT * FROM most_popular_keywords WHERE user_id = ?";
    const querySentiment = "SELECT * FROM sentiment WHERE user_id = ?";
    const queryTopFriends =
      "SELECT * FROM top_friends WHERE user_id = ? LIMIT 10";
    const queryTopReactors =
      "SELECT * FROM top_reactors WHERE user_id = ? LIMIT 10";
    const queryTopCommentors =
      "SELECT * FROM top_commentors WHERE user_id = ? LIMIT 10";
    const queryOnlineActivityByDay =
      "SELECT * FROM online_activity_by_day WHERE user_id = ? AND activity_date = ?";
    const queryOnlineActivityByWeek =
      "SELECT * FROM online_activity_by_week WHERE user_id = ?";

    // INFO: Query for user account
    const userAccountResults = await query(queryRealAccount, [username, media]);
    if (userAccountResults.length === 0) {
      return res.status(404).json({ message: "No user Account found" });
    }

    const userId = userAccountResults[0].id;

    // INFO: query for daily posts and engagement
    const dailyPostsResults = await query(queryDailyPostsAndEngagement, [
      userId,
      startDate,
      endDate,
    ]);

    // INFO: Query for popular hashtag
    const popularHashtagsResults = await query(queryPopularHashtag, [userId]);

    // INFO: Query for top posts
    const topPostsResults = await query(queryTopPosts, [userId]);

    // INFO: Query for Popular Emails
    const popularEmailsResults = await query(queryPopularEmails, [userId]);

    // INFO: Query for Popular Phone Numbers
    const popularPhoneNumbersResults = await query(queryPopularPhoneNumbers, [
      userId,
    ]);

    // INFO: Query for Popular Keywords
    const popularKeywordsResults = await query(queryPopularKeywords, [userId]);

    // INFO: Query for sentiment
    const sentimentResults = await query(querySentiment, [userId]);

    // INFO: Query for Top Friends
    const topFriendsResults = await query(queryTopFriends, [userId]);

    // INFO: Query for Top Reactors
    const topReactorsResults = await query(queryTopReactors, [userId]);

    // INFO: Query for Top Commentors
    const topCommentorsResults = await query(queryTopCommentors, [userId]);

    // INFO: Query for Online Activity by Day
    const onlineActivityByDayResults = await query(queryOnlineActivityByDay, [
      userId,
      currentDate,
    ]);

    // INFO: Query for Online Activity by Week
    const onlineActivityByWeekResults = await query(queryOnlineActivityByWeek, [
      userId,
    ]);

    res.status(200).json({
      data: {
        user_account: userAccountResults[0],
        daily_posts: dailyPostsResults,
        popular_hashtags: popularHashtagsResults,
        top_posts: topPostsResults,
        popular_emails: popularEmailsResults,
        popular_phone_numbers: popularPhoneNumbersResults,
        popular_keywords: popularKeywordsResults,
        sentiments: sentimentResults,
        top_friends: topFriendsResults,
        top_reactors: topReactorsResults,
        top_commentors: topCommentorsResults,
        online_per_day: onlineActivityByDayResults,
        online_per_week: onlineActivityByWeekResults,
      },
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
