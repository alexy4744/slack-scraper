/* Constants to be used throughout the bot */

module.exports = {
  // https://get.slack.help/hc/en-us/articles/201314026-Roles-and-permissions-in-Slack
  permissions: {
    "bot_owner": 1337,
    "is_primary_owner": 3,
    "is_owner": 2,
    "is_admin": 1,
    "everyone": 0
  },

  // https://api.slack.com/events/message
  messageOptions: {
    as_user: true // eslint-disable-line
  },

  colors: {
    primary: "#5089DB",
    success: "#76B354",
    fail: "#DE2E43",
    pending: "#FFAC32"
  },

  emojis: {
    success: "✅ ｜ ",
    fail: "❌ ｜ ",
    pending: "⏳ ｜ ",
    divider: " ｜ "
  }
};