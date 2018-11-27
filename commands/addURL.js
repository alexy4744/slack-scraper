const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");
const { stringToMillis } = require("../structures/Util");

class AddURL extends Command {
  constructor(...args) {
    super(...args, {
      permissions: 1
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
        ctx.body = new RichMessage()
          .setTitle(`${this.client.emojis.fail}Sorry, an error has occurred!`)
          .setText(`\`\`\`\n${error.message}\n\`\`\``)
          .setColor(this.client.colors.fail)
          .message;

        return;
      }
    }

    const url = args[0];
    const cssSelector = args[1];
    const frequency = stringToMillis(args[2]);

    if (!url || !cssSelector || !frequency) {
      ctx.body = new RichMessage()
        .setTitle(`${this.client.emojis.fail}Insufficient arguments provided!`)
        .setText(`You must provide a URL, CSS selector and frequency in sequential order!`)
        .setColor(this.client.colors.fail)
        .message;

      return;
    }

    scraper.urls.push({
      url,
      cssSelector
    });

    try {
      await this.client.db.update({ scraper });
    } catch (error) {
      ctx.body = new RichMessage()
        .setTitle(`${this.client.emojis.fail}Sorry, an error has occurred!`)
        .setText(`\`\`\`\n${error.message}\n\`\`\``)
        .setColor(this.client.colors.fail)
        .message;

      return;
    }

    ctx.body = new RichMessage()
      .setTitle(`${this.client.emojis.success}I have added a new URL to scrape!`)
      .setText(`URL: ${url}\n\nCSS Selector: \`${cssSelector}\`\n\nFrequency: ${frequency} ms`)
      .setColor(this.client.colors.success)
      .message;
  }
}

module.exports = AddURL;