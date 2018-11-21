const Util = require("./Util");

class Base {
  constructor(client) {
    this.client = client;
    this.utils = Util;
  }

  async getUser(user) {
    if (this.client.cache.users.has(user)) return Promise.resolve(this.client.cache.users.get(user));

    const data = await this.client.web.users.info({ user }).catch(error => ({ error }));
    if (data.error) return Promise.reject(data.error);

    this.client.cache.users.set(data.user.id, data.user);

    return Promise.resolve(data);
  }
}

module.exports = Base;