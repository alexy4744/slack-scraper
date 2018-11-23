const Base = require("./Base");

class Inhibitor extends Base {
  constructor(client, options = {}) {
    super(client);
    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All inhibitors must be named via the options object or having a named constructor!");
  }

  run() {
    throw new Error(`Run method not found for ${this.name}`);
  }

  _run(...args) {
    return this.run(...args);
  }

  /* Maybe some methods that might be needed in the future or something */
}

module.exports = Inhibitor;