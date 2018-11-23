const Inhibitor = require("../structures/Base/Inhibitor");

class CheckUserPermissions extends Inhibitor {
  constructor(...args) {
    super(...args, {});
  }

  run(msg, cmd) {
    if (msg.user.permissions.highest < cmd.userPermissions) {
      msg.channel.send(`You do not have permissions to run this command!`);
      return false;
    }

    return true;
  }
}

module.exports = CheckUserPermissions;