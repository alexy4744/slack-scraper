const Store = require("./Store");
const fs = require("fs-nextra");

class CommandStore extends Store {
  constructor(...args) {
    super(...args);
  }

  reload(command) {
    try {
      command = this.client.commands.get(command);

      this.client.aliases.unlink(command.aliases, true);
      this.client.commands.remove(command.name);

      const cmd = this.resolve(command.name);
      this.client.commands.set(cmd.name, cmd);

      for (const alias of cmd.aliases) this.client.aliases.link(alias, cmd);

      return Promise.resolve(this.client.commands.get(cmd.name));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async reloadAll() {
    for (const command of this.client.commands) {
      if (command[1].aliases.length) this.client.aliases.unlink(command[1].aliases);
      this.client.commands.remove(command[0]);
    }

    const allCommands = await fs.readdir("./commands").catch(error => ({ error }));
    if (allCommands.error) return Promise.reject(allCommands.error);

    for (let newCommand of allCommands) {
      newCommand = this.resolve(newCommand);
      this.add(newCommand.name, newCommand);

      for (const alias of newCommand.aliases) {
        this.client.aliases.link(alias, newCommand);
      }
    }

    return Promise.resolve(this);
  }

  resolve(command) {
    return new (require(`../commands/${command}`))(this.client);
  }
}

module.exports = CommandStore;