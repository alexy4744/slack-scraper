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
  }
};