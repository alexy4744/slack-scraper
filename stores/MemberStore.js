const Store = require("../structures/Store");
const Member = require("../structures/Member");

class MemberStore extends Store {
  constructor(...args) {
    super(...args);
  }

  /* Grabs the member from the cache if it exists, else resolve it from the API */
  async fetch(id) {
    try {
      return Promise.resolve(this.has(id) ? this.get(id) : await this.resolve(id));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /* Resolves the member from the API and updates the cache */
  async resolve(id) {
    const user = await this.client.users
      .info({ user: id })
      .then(res => new Member(this.client, res.user))
      .catch(error => ({ error }));
    if (user.error) return Promise.reject(user.error);

    this.has(id) ? this.set(id, user) : this.add(id, user);

    return Promise.resolve(user);
  }
}

module.exports = MemberStore;