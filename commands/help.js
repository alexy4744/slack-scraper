const Command = require("../structures/Base/Command");

class Help extends Command {
  constructor(...args) {
    super(...args);
  }
}

module.exports = Help;