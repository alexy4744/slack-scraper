const Command = require("../structures/Base/Command");

class Reload extends Command {
  constructor(...args) {
    super(...args, {
      description: `Reloads commands, events, inhibitors, tasks.`,
      userPermissions: 1337
    });
  }
}

module.exports = Reload;