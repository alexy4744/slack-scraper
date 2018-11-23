const Command = require("../structures/Base/Command");

class SetURL extends Command {
  constructor(...args) {
    super(...args, {
      userPermissions: 1
    });
  }
}

module.exports = SetURL;