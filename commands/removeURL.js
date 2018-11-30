const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");

class RemoveURL extends Command {
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

    if (!url) {
      ctx.body = new RichMessage()
        .setTitle(`${this.client.constants.emojis.fail}Insufficient arguments provided!`)
        .setText(`You must include the URL to be removed!`)
        .setColor(this.client.constants.colors.fail)
        .message;

      return;
    }

    let found = false;

    for (let i = 0; i < scraper.urls.length; i++) {
      if (scraper.urls[i].url === url) {
        this.client.tasks.manager.remove(scraper.urls[i].id);
        scraper.urls.splice(i, 1);
        found = true;
      }
    }

    if (!found) {
      ctx.body = new RichMessage()
        .setTitle(`${this.client.constants.emojis.fail}Could not find "${url}" in the database!`)
        .message;

      return;
    }

    try {
      await this.client.db.write({ scraper });
    } catch (error) {
      ctx.body = new RichMessage().buildError(error.message);
      return;
    }

    ctx.body = new RichMessage()
      .setTitle(`${this.client.constants.emojis.success}I have removed a new URL to scrape!`)
      .setText(`URL: ${url}`)
      .setColor(this.client.constants.colors.success)
      .message;
  }
}

module.exports = RemoveURL;