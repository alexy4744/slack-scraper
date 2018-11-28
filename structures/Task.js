/* TODO: Add a "forked" option that allows you to use whether the task should be ran from a forked child process or not.
         Helps prevent the thread from being blocked if its an intensive task. */

class Task {
  constructor(client, options = {}) {
    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All commands must be named via the options object or have a named constructor!");

    this.client = client;
    this.interval = options.interval || 5000;
    // this.forked = options.forked || false; /* TODO */
  }

  run() {
    throw new Error(`No run method found for ${this.name}`);
  }

  _run() {
    setInterval(() => this.run(), this.interval);
  }
}

module.exports = Task;