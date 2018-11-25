const Inhibitor = require("../structures/Inhibitor");

class CheckPermissions extends Inhibitor {
  constructor(...args) {
    super(...args);
  }

  run(ctx) {
    return true;
  }
}

module.exports = CheckPermissions;