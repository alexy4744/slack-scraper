const Base = require("./Base");
const Permissions = require("./Permissions");

class User extends Base {
  constructor(client, user, team) {
    super(client);
    Object.assign(this, user);

    this.team = team;
  }

  get permissions() {
    return new Permissions(this);
  }
}

module.exports = User;