const Base = require("./Base");

class Event extends Base {
  constructor(client, options = {}) {
    super(client);
    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All events must be named via the options object or having a named constructor!");
  }

  run() {
    throw new Error(`No run method found for ${this.name}!`);
  }

  /* Removes event listener from RTM first before removing it from the store. */
  remove() {
    this.client.rtm.off(this.name, this.get(this.name));
    this.client.events.remove(this.name);
    return this.client.events;
  }

  async reload() {
    try {
      await this.remove(this.name);
      await this.client.events.listen(this.name);
      return this.client.events.get(this.name);
    } catch (error) {
      return Promise.resolve(error);
    }
  }
}

module.exports = Event;