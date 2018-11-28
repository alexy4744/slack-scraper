const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");
const { stringToMillis } = require("../structures/Util");

class AddURL extends Command {
  constructor(...args) {
    super(...args, {
      permissions: 1337
    });
  }

  async run(ctx, args) {
    let scraper = this.client.db.cache.scraper;

    if (!scraper || (scraper && !scraper.urls)) {
      try {
        await this.client.db.update({
          scraper: {
            urls: []
          }
        });

        scraper = this.client.db.cache.scraper;
      } catch (error) {
        ctx.body = new RichMessage().buildError(error.message);
        return;
      }
    }

    const url = args[0];
    const frequency = stringToMillis(args[1]);
    const jQueryFn = args[2];

    if (!url || !jQueryFn || !frequency) {
      ctx.body = new RichMessage()
        .setTitle(`${this.client.emojis.fail}Insufficient arguments provided!`)
        .setText(`You must provide a URL, jQuery function and frequency in sequential order!`)
        .setColor(this.client.colors.fail)
        .message;

      return;
    }

    scraper.urls.push({
      url,
      jQueryFn,
      frequency
    });

    try {
      await this.client.db.update({ scraper });
    } catch (error) {
      ctx.body = new RichMessage().buildError(error.message);

      return;
    }

    ctx.body = new RichMessage()
      .setTitle(`${this.client.emojis.success}I have added a new URL to scrape!`)
      .setText(`URL: ${url}\n\njQuery Function: \`${jQueryFn}\`\n\nFrequency: *${args[1]}*`)
      .setColor(this.client.colors.success)
      .message;
  }
}

module.exports = AddURL;