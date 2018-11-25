const Command = require("../structures/Command");

class Ping extends Command {
  constructor(...args) {
    super(...args);
  }

  async run(msg, args) {

  }
}

module.exports = Ping;