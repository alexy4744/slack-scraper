const Command = require("../structures/Command");

class Ping extends Command {
  constructor(...args) {
    super(...args);
  }

  run(ctx) {
    ctx.body = {
      "text": "yooo"
    };
  }
}

module.exports = Ping;