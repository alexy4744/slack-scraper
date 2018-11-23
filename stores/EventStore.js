const Store = require("./Store");
const Event = require("../structures/Base/Event");

class EventStore extends Store {
  constructor(...args) {
    super(...args);
  }

  listen(name) {
    if (this.has(name)) return Promise.resolve(this);

    const event = this.resolve(name);

    this.remove(name);
    this.add(name, event);
    this.client.rtm.on(name, (...args) => this.get(name).run(...args));

    return Promise.resolve(this);
  }

  resolve(name) {
    let ResolvedEvent = require(`../events/${name}`);
    if (!ResolvedEvent.constructor) throw new Error(`${name} has no constructor!`);

    ResolvedEvent = new ResolvedEvent(this.client);
    if (!(ResolvedEvent instanceof Event)) throw new Error(`${name} is not an instance of Event!`);

    return ResolvedEvent;
  }
}

module.exports = EventStore;