const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");

class SetChannel extends Command {
  constructor(...args) {
    super(...args, {
      permissions: 1
    });
  }

  async run(ctx) {
    try {
      await this.client.db.update({
        scraper: {
          channel: ctx.request.body.channel_id
        }
      });

      ctx.body = new RichMessage()
        .setTitle(`${this.client.constants.emojis.success}I have successfully set this as the designated channel!`)
        .setText(`I will now post web scrape results in this channel.`)
        .setColor(this.client.constants.colors.success)
        .message;
    } catch (error) {
      ctx.body = new RichMessage().buildError(error.message);
    }
  }
}

module.exports = SetChannel;