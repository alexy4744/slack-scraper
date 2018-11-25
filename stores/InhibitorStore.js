const Store = require("../structures/Store");
const fs = require("fs-nextra");

class InhibitorStore extends Store {
  constructor(...args) {
    super(...args);
  }

  async loadAll() {
    const inhibitors = await fs
      .readdir("./inhibitors")
      .then(i => i.map(inhibitor => this.resolve(inhibitor)))
      .catch(error => ({ error }));
    if (inhibitors.error) return Promise.reject(inhibitors.error);

    for (const inhibitor of inhibitors) this.add(inhibitor.name, inhibitor);
    return Promise.resolve(this);
  }
}

module.exports = InhibitorStore;