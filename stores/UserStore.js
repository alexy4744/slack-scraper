const Store = require("./Store");
const Permissions = require("../structures/Base/Permissions");
const User = require("../structures/Base/User");

class UserStore extends Store {
  constructor(...args) {
    super(...args);
  }

  /* Gets the user from its cache, otherwise, fetch it from API and save it to cache */
  async fetch(id, team) {
    if (this.has(id)) return Promise.resolve(this.get(id));

    const user = await this.resolve(id).catch(error => ({ error }));
    if (user.error) return Promise.reject(user.error);

    this.add(user.id, new User(this.client, user, team));

    return Promise.resolve(user);
  }

  /* Fetches the user object from API with the given user id */
  async resolve(id) {
    const data = await this.client.web.users.info({ user: id }).catch(error => ({ error }));
    if (data.error) return Promise.reject(data.error);
    data.user.permissions = new Permissions(data);
    return Promise.resolve(data.user);
  }
}

module.exports = UserStore;