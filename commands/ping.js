const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");

class Ping extends Command {
  constructor(...args) {
    super(...args);
  }

  run(ctx, args) {
    if (!args[0] || !args[0].startsWith("#")) {
      ctx.body = new RichMessage()
        .setTitle
    }
  }
}

module.exports = Ping;