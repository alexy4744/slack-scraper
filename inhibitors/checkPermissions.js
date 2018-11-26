const Inhibitor = require("../structures/Inhibitor");

class CheckPermissions extends Inhibitor {
  constructor(...args) {
    super(...args);
  }

  run(ctx, cmd) {
    const { user } = ctx.request.body;

    if (user.permissions.highest < cmd.permissions) {
      ctx.body = { "text": "You do not have the permissions to run this command!" };
      return false;
    }

    return true;
  }
}

module.exports = CheckPermissions;