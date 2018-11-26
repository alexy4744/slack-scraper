class Event {
  constructor(client, options = {}) {
    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All commands must be named via the options object or have a named constructor!");

    this.client = client;
  }

  listen() {
    throw new Error(`No listen method found for ${this.name}!`);
  }
}

module.exports = Event;