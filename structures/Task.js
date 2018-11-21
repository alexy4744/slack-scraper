const Base = require("./Base");

class Task extends Base {
  constructor(client, options = {}) {
    super(client);
    if (!options.interval) throw new Error(`Interval must be specified for tasks within options, not ${options.interval}`);

    this.client = client;
    this.interval = options.interval; // Provided time is in seconds not ms.
  }

  _run() {
    setInterval(() => this.run(this.client), this.interval * 60000);
  }
}

module.exports = Task;