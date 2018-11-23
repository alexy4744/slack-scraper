class Store extends Map {
  constructor(client, ...args) {
    super(...args);
    if (!client) throw new Error("You must pass in the Client object into the Store constructor in order to create a new instance!");
    this.client = client;
  }

  add(id, value) {
    if (this.has(id)) this.get(id);
    else this.set(id, value);
    return this;
  }

  remove(id) {
    if (!this.has(id)) return this;
    this.delete(id);
    return this;
  }
}

module.exports = Store;