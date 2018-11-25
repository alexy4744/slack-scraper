class Inhibitor {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All inhibitors must be named via the options object or have a named constructor!");
  }

  run() {
    throw new Error(`No run method found for ${this.name}`);
  }

  _run() {

  }
}

module.exports = Inhibitor;