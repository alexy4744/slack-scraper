const Permissions = require("./Permissions");

class Member {
  constructor(client, data) {
    Object.assign(this, data);

    this.client = client;
  }

  get permissions() {
    return new Permissions(this);
  }
}

module.exports = Member;