const Event = require("../structures/Base/Event");
const User = require("../structures/Base/User");

class OnUserChange extends Event {
  constructor(...args) {
    super(...args);
  }

  run(user) {
    user = user.user;

    if (user.id === this.client.owner) user.bot_owner = true; // eslint-disable-line
    this.client.users.set(user.id, new User(this.client, user, this.client.teams.get(user.team_id)));
  }
}

module.exports = OnUserChange;