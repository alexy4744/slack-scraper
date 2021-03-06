const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");
const { scrape } = require("../structures/Util");
const superagent = require("superagent");

class Scrape extends Command {
  constructor(...args) {
    super(...args, {
      permissions: 1337
    });
  }

  async run(ctx, args) {
    const url = args[0];
    const jQueryFn = args.slice(1).join(" "); // the jQuery function to execute

    if (!url || !jQueryFn) {
      ctx.body = new RichMessage()
        .setTitle(`${this.client.constants.emojis.fail}Insufficient parameters provided!`)
        .setText(`You must provide a URL and a jQuery function for me to scrape!`)
        .setColor(this.client.constants.colors.fail)
        .message;

      return;
    }

    try {
      ctx.status = 200; // Tell Slack that the bot has already received the command
      ctx.body = "";

      const scraped = await scrape(url, jQueryFn);

      return delayedSend(new RichMessage()
        .setTitle(`${this.client.constants.emojis.success}Here are the results from the web scrape!`)
        .setText(`\`\`\`\n${scraped}\n\`\`\``)
        .setColor(this.client.constants.colors.success)
        .message);
    } catch (error) {
      return delayedSend(new RichMessage().buildError(error.message));
    }

    async function delayedSend(message) { // Function to send messages just in case if the response needs to take longer than 3 seconds
      try {
        await superagent.post(ctx.request.body.response_url).send(message); // Use the provided response url to send the message instead of assigning it to body of Koa
      } catch (error) {
        // Ignore errors, since there's nothing you could really do if an error does occur.
      }
    }
  }
}

module.exports = Scrape;