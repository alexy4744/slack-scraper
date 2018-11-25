const Store = require("../structures/Store");
const fs = require("fs-nextra");

class CommandStore extends Store {
  constructor(...args) {
    super(...args);
  }

  async reloadAll() {
    try {
      for (const command of this.client.commands) {
        delete require.cache[require.resolve(`../commands/${command[0]}`)];
        this.remove(command[0]);
      }

      await this.loadAll();

      return Promise.resolve(this);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async loadAll() {
    const commands = await fs
      .readdir("./commands")
      .then(cmds => cmds.map(cmd => this.resolve(cmd)))
      .catch(error => ({ error }));
    if (commands.error) return Promise.reject(commands.error);

    for (const command of commands) this.add(command.name, command);
    return Promise.resolve(this);
  }

  resolve(name) {
    return new (require(`../commands/${name}`))(this.client);
  }
}

module.exports = CommandStore;