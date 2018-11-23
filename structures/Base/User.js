const Base = require("./Base");
const Permissions = require("./Permissions");

class User extends Base {
  constructor(client, user) {
    super(client);
    Object.assign(this, { ...user });
  }

  get permissions() {
    return new Permissions(this);
  }
}

module.exports = User;