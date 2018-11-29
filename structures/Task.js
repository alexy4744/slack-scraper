/* TODO: Add a "forked" option that allows you to use whether the task should be ran from a forked child process or not.
         Helps prevent the thread from being blocked if its an intensive task. */

class Task {
  constructor(client, options = {}) {
    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All commands must be named via the options object or have a named constructor!");

    this.client = client;
    this.interval = options.interval || 5000; // How frequent the interval should run
    this.running = false;
    this._interval = null; // Holds the interval function, useful for clearing it later
    // this.forked = options.forked || false; /* TODO */
  }

  run() {
    throw new Error(`No run method found for ${this.name}`);
  }

  clear() {
    clearInterval(this._interval);
    this._interval = null;
    this.running = false;
    return this;
  }

  _run() {
    this.running = true;
    this._interval = setInterval(() => this.run(), this.interval);
    return this;
  }
}

module.exports = Task;