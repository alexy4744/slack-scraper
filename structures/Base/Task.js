const Base = require("./Base");

class Task extends Base {
  constructor(client, options = {}) {
    super(client);
    if (!options.interval) throw new Error(`Interval must be specified for tasks within options, not ${options.interval}`);

    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All tasks must be named via the options object or having a named constructor!");

    this.client = client;
    this.interval = options.interval; // Provided time is in seconds not ms.
  }

  run() {
    throw new Error(`Run method not found for ${this.name}!`);
  }

  _run() {
    setInterval(() => this.run(this.client), this.interval * 60000);
  }
}

module.exports = Task;