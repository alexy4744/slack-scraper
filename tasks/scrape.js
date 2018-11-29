// TODO: It probably shouldn't just keep checking if the cache every second

const Task = require("../structures/Task");
const RichMessage = require("../structures/RichMessage");
const { messageOptions } = require("../structures/Constants");
const { scrape } = require("../structures/Util");

class WebScraper extends Task {
  constructor(...args) {
    super(...args, {
      interval: 1000
    });
  }

  run() {
    const scraper = this.client.db.cache.scraper;
    if (!scraper || !scraper.urls || !scraper.urls.length || !scraper.channel) return;

    for (const url of scraper.urls) {
      this.client.tasks.manager.add(url.url, async () => {
        try {
          const data = await scrape(url.url, url.jQuery);
          await this.client.web.chat.postMessage({
            channel: scraper.channel,
            ...messageOptions,
            ...new RichMessage()
              .setTitle(url.url)
              .setTitleLink(url.url)
              .setText(data)
              .setColor(this.client.colors.primary)
              .message
          });
        } catch (error) {
          throw error;
        }
      }, url.frequency);
    }
  }
}

module.exports = WebScraper;