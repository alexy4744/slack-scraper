const Base = require("./Base");
const Message = require("./Message");
const Store = require("../../stores/Store");
const { messageOptions } = require("../Constants");

class Channel extends Base {
  constructor(client, channel) {
    super(client);
    Object.assign(this, channel);

    this.messages = new Store(client);
  }

  async send(text) {
    try {
      const msg = await this.client.web.chat
        .postMessage({
          ...messageOptions,
          channel: this.id,
          text
        })
        .then(m => this.utils.normalizeMessage(m));

      const user = await this.client.users.fetch(msg.user);
      return Promise.resolve(new Message(this.client, msg, this, user));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = Channel;