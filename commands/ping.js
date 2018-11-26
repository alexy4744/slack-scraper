const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");

class Ping extends Command {
  constructor(...args) {
    super(...args);
  }

  run(ctx) {
    return ctx.body = new RichMessage()
      .setTitle(`🏓 ｜ Pong!`)
      .setText(`I'm alive!`)
      .setColor(this.client.colors.primary)
      .message;
  }
}

module.exports = Ping;