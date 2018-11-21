const Task = require("../structures/Task");
const { scrape } = require("../structures/Util");

class Scrape extends Task {
  constructor(...args) {
    super(...args, {
      interval: 15
    });
  }

  run() {
    const currYear = String(new Date(Date.now()).getFullYear()).slice(2); // Get the last 2 digits of the current year so 2018 = 18
    const yearSuffix = String(Number(currYear) + Number(currYear + 1));
    const site = `https://sites.google.com/a/hstat.org/`;
    const urls = ["10", "11", "12"].map(grade => `${site}${grade}${yearSuffix}`);

    for (const url of urls) {

    }
  }
}

module.exports = Scrape;