// TODO: It probably shouldn't just keep checking if the cache every second

const Task = require("../structures/Task");
const { scrape } = require("../structures/Util");

class WebScraper extends Task {
  constructor(...args) {
    super(...args, {
      interval: 1000
    });
  }

  run() {
    const scraper = this.client.db.cache.scraper;
    if (!scraper || (scraper && scraper.urls < 1)) return;

    for (const url of scraper.urls) {
      this.client.tasks.manager.add(url.url, () => scrape(url.url, url.cssSelector, url.jQueryFn), url.frequency);
    }
  }
}

module.exports = WebScraper;