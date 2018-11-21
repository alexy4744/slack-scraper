const Base = require("./Base");

class TextChannel extends Base {
  constructor(client, channelId) {
    super(client);
    this.id = channelId;
  }

  send(string) {
    return this.client.rtm.sendMessage(string, this.id);
  }
}

module.exports = TextChannel;