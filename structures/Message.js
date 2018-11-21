const Base = require("./Base");
const TextChannel = require("./TextChannel");

class Message extends Base {
  constructor(client, message) {
    super(client);
    Object.assign(this, {
      ...message,
      channel: new TextChannel(client, message.channel)
    });
  }
}

module.exports = Message;