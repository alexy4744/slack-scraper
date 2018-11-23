const Store = require("./Store");

class AliasStore extends Store {
  constructor(...args) {
    super(...args);
  }

  /* Unlink the specified alias to the command */
  unlink(alias, shouldDelete) {
    if (Array.isArray(alias)) {
      for (const a of alias) this.unlink(a);
    }

    if (!this.has(alias)) return this;

    shouldDelete ? this.delete(alias) : this.set(alias, null);

    return this;
  }

  /* Link the alias to a command name */
  link(alias, commandName) {
    this.unlink(alias);
    this.set(alias, commandName);
    return this;
  }
}

module.exports = AliasStore;