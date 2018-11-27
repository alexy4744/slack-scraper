const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");
const cheerio = require("cheerio");
const superagent = require("superagent");
const { messageOptions } = require("../structures/Constants");

class Scrape extends Command {
  constructor(...args) {
    super(...args, {
      permissions: 1
    });
  }

  async run(ctx, args) {
    const url = args[0];
    const cssSelector = args[1];
    const jQueryFn = args[2]; // the jQuery function to execute

    if (!url || !cssSelector || !jQueryFn) {
      ctx.body = new RichMessage()
        .setTitle(`${this.client.emojis.fail}Insufficient parameters provided!`)
        .setText(`You must provide a URL, CSS Selector and a jQuery function for me to scrape!`)
        .setColor(this.client.colors.fail)
        .message;

      return;
    }

    try {
      ctx.status = 200; // Tell Slack that the bot has already received the command
      ctx.body = "";

      const $ = await superagent.get(url).then(res => cheerio.load(res.text));
      const content = [];

      $(cssSelector).each((index, el) => content.push($(el)[jQueryFn]())); // Loop through each element found by the css selector and push it to the array

      return delayedSend(new RichMessage()
        .setTitle(`${this.client.emojis.success}Here are the results from the web scrape!`)
        .setText(`\`\`\`\n${content.join("\n")}\n\`\`\``)
        .setColor(this.client.colors.success)
        .message);
    } catch (error) {
      return delayedSend(new RichMessage()
        .setTitle(`${this.client.emojis.fail}Sorry, an error has occurred!`)
        .setText(`\`\`\`\n${error.message}\n\`\`\``)
        .setColor(this.client.colors.fail)
        .message);
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