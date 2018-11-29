const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");
const { stringToMillis, normalizeSpaces } = require("../structures/Util");

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
    const jQuery = normalizeSpaces(args.slice(2).join(" "));

    if (!url || !jQuery || !frequency) {
      ctx.body = new RichMessage()
        .setTitle(`${this.client.emojis.fail}Insufficient arguments provided!`)
        .setText(`You must provide a URL, jQuery function and frequency in sequential order!`)
        .setColor(this.client.colors.fail)
        .message;

      return;
    }

    scraper.urls.push({
      url,
      jQuery,
      frequency,
      id: String(Date.now()) // Just used as a unique identifier
    });

    try {
      await this.client.db.write({ scraper });
    } catch (error) {
      ctx.body = new RichMessage().buildError(error.message);
      return;
    }

    ctx.body = new RichMessage()
      .setTitle(`${this.client.emojis.success}I have added a new URL to scrape!`)
      .setText(`URL: ${url}\n\nFrequency: *${args[1]}*\n\njQuery Function: \`\`\`${jQuery}\`\`\``)
      .setColor(this.client.colors.success)
      .message;
  }
}

module.exports = AddURL;