const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");

class Reload extends Command {
  constructor(...args) {
    super(...args);
  }

  run(ctx, args) {
    const cmd = args[0];
    if (!cmd || (cmd && !this.client.commands.has(cmd))) {
      ctx.body = new RichMessage().buildError(new Error("You must specify a valid command to be reloaded!").message);
      return;
    }

    try {
      this.client.commands.get(cmd).reload();
    } catch (error) {
      ctx.body = new RichMessage().buildError(error.message);
      return;
    }

    ctx.body = new RichMessage()
      .setTitle(`${this.client.constants.emojis.success}I have successfully reloaded ${args[0]}`)
      .message;
  }
}

module.exports = Reload;