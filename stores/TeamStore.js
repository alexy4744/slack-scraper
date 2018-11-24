const Store = require("./Store");
const Team = require("../structures/Base/Team");

class TeamStore extends Store {
  constructor(...args) {
    super(...args);
  }

  /* Gets the user from its cache, otherwise, fetch it from API and save it to cache */
  async fetch(id) {
    if (this.has(id)) return Promise.resolve(this.get(id));

    const team = await this.resolve().catch(error => ({ error }));
    if (team.error) return Promise.reject(team.error);

    this.add(team.id, new Team(this.client, team));

    return Promise.resolve(this.get(team.id));
  }

  /* Fetches the team object from API */
  async resolve() {
    const data = await this.client.web.team.info().catch(error => ({ error }));
    if (data.error) return Promise.reject(data.error);
    return Promise.resolve(data.team);
  }
}

module.exports = TeamStore;