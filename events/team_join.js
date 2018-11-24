const Event = require("../structures/Base/Event");
const User = require("../structures/Base/User");

class OnTeamJoin extends Event {
  constructor(...args) {
    super(...args);
  }

  run(user) {
    user = user.user;
    this.client.user.add(user.id, new User(this.client, user, this.client.teams.get(user.team_id)));
  }
}

module.exports = OnTeamJoin;