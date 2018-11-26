const Store = require("../structures/Store");
const fs = require("fs-nextra");

class EventStore extends Store {
  constructor(...args) {
    super(...args);
  }

  async listenAll() {
    const events = await fs
      .readdir("./events")
      .then(e => e.map(event => this.resolve(event)))
      .catch(error => ({ error }));
    if (events.error) return Promise.reject(events.error);

    for (const event of events) {
      this.add(event.name, event);
      this.client.rtm.on(event.name, (...args) => event.listen(...args));
    }

    return Promise.resolve(this);
  }

  resolve(name) {
    return new (require(`../events/${name}`))(this.client);
  }
}

module.exports = EventStore;