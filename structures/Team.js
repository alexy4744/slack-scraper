const Base = require("./Base");

class Team extends Base {
  constructor(client, team) {
    super(client);
    Object.assign(this, team);
  }
}

module.exports = Team;