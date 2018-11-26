const Permissions = require("./Permissions");

class Member {
  constructor(client, data) {
    Object.assign(this, data);
    this.client = client;
    this.bot_owner = data.id === this.client.owner ? true : false; // eslint-disable-line
  }

  get permissions() {
    return new Permissions(this);
  }
}

module.exports = Member;