const Base = require("./Base");
const { messageOptions } = require("../Constants");

class Message extends Base {
  constructor(client, message, channel, user) {
    super(client);
    Object.assign(this, this.utils.normalizeMessage(message));

    this.channel = channel;
    this.user = user;
  }

  edit(text) {
    return this.client.web.chat.update({
      ...messageOptions,
      channel: this.channel.id,
      ts: this.ts,
      text
    });
  }

  delete() {
    return this.client.web.chat.delete({
      ...messageOptions,
      channel: this.channel.id,
      ts: this.ts
    });
  }
}

module.exports = Message;