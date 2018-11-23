const Store = require("./Store");
const Channel = require("../structures/Base/Channel");

class ChannelStore extends Store {
  constructor(...args) {
    super(...args);
  }

  /* Gets the user from its cache, otherwise, fetch it from API and save it to cache */
  async fetch(id) {
    if (this.has(id)) return Promise.resolve(this.get(id));

    const channel = await this.resolve(id).catch(error => ({ error }));
    if (channel.error) return Promise.reject(channel.error);

    this.add(id, new Channel(this.client, channel));

    return Promise.resolve(this.get(id));
  }

  /* Fetches the channel object from API with the given user id */
  async resolve(id) {
    const data = await this.client.web.channels.info({ channel: id }).catch(error => ({ error }));
    if (data.error) return Promise.reject(data.error);
    return Promise.resolve(data.channel);
  }
}

module.exports = ChannelStore;