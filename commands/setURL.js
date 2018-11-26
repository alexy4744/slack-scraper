const Command = require("../structures/Command");

class SetURL extends Command {
  constructor(...args) {
    super(...args, {
      permissions: 1
    });
  }

  async run(ctx, args) {
    const link = args[0];
    const cssSelector = args[1];
  }
}

module.exports = SetURL;