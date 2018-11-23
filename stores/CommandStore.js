const Store = require("./Store");
const fs = require("fs-nextra");

class CommandStore extends Store {
  constructor(...args) {
    super(...args);
  }

  async reloadAll() {
    try {
      for (const command of this.client.commands) {
        delete require.cache[require.resolve(`../commands/${command[0]}`)];

        if (command[1].aliases.length) this.client.aliases.unlink(command[1].aliases, true);
        this.client.commands.remove(command[0]);
      }

      const allCommands = await fs.readdir("./commands").catch(error => ({ error }));
      if (allCommands.error) return Promise.reject(allCommands.error);

      for (let newCommand of allCommands) {
        newCommand = this.resolve(newCommand);
        this.add(newCommand.name, newCommand);

        for (const alias of newCommand.aliases) {
          this.client.aliases.link(alias, newCommand.name);
        }
      }

      return Promise.resolve(this);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  resolve(command) {
    return new (require(`../commands/${command}`))(this.client);
  }
}

module.exports = CommandStore;