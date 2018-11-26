
const Event = require("../structures/Event");
const Member = require("../structures/Member");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "user_change"
    });
  }

  listen(payload) {
    const member = new Member(payload.user);
    return this.client.members.set(member.id, member);
  }
};
