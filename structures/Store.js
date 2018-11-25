class Store extends Map {
  constructor(client, ...args) {
    super(...args);
    this.client = client;
  }

  add(key, value) {
    if (this.has(key)) return this.get(key);
    this.set(key, value);
    return this.get(key);
  }

  remove(key) {
    if (!this.has(key)) return this;
    this.delete(key);
    return this;
  }
}

module.exports = Store;