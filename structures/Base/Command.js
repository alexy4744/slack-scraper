const Base = require("./Base");

class Command extends Base {
  constructor(client, options = {}) {
    super(client);
    this.name = options.name ? options.name.toLowerCase() : this.constructor.name ? this.constructor.name.toLowerCase() : null;
    if (!this.name) throw new Error("All commands must be named via the options object or having a named constructor!");

    this.aliases = options.aliases || [];
    this.description = options.description || "No description provided.";
    this.usage = options.usage || "No usage information provided.";
    this.userPermissions = options.userPermissions || 0;
    this.botPermissions = options.botPermissions || 0;
  }

  reload() {
    try {
      delete require.cache[require.resolve(`../../commands/${this.name}`)];

      this.client.aliases.unlink(this.aliases, true);
      this.client.commands.remove(this.name);

      const command = this.client.commands.resolve(this.name);
      this.client.commands.add(command.name, command);

      for (const alias of command.aliases) this.client.aliases.link(alias, command);

      return this.client.commands.get(this.name);
    } catch (error) {
      return Promise.resolve(error);
    }
  }

  run() {
    throw new Error(`Run method not found for ${this.name}!`);
  }

  _run(...args) {
    if (!this._runInhibitors(...args)) return;
    return this.run(...args);
  }

  _runInhibitors(msg) {
    let passed = 0;

    for (const inhibitors of this.client.inhibitors) {
      if (inhibitors[1]._run(msg, this)) passed++;
    }

    if (passed < this.client.inhibitors.size) return false;
    return true;
  }
}

module.exports = Command;