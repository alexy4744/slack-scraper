const Base = require("./Base");
const TextChannel = require("./TextChannel");

class Message extends Base {
  constructor(client, message) {
    super(client);
    Object.assign(this, {
      ...message,
      channel: new TextChannel(client, message.channel),
      args: message.text
        .slice(client.prefix.length).trim()
        .split(/ +/g)
    });
  }
}

module.exports = Message;