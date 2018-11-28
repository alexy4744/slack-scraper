class Util {
  constructor() {
    throw new Error(`You should not be creating a new instance of Util!`);
  }

  static isObject(input) {
    if (input.constructor && input.constructor === Object) return true;
    return false;
  }

  /* Make consistent spaces by removing multiple unnecessary spaces i.e. double space */
  // https://stackoverflow.com/questions/8927844/trimming-spaces-while-preserving-line-breaks
  static normalizeSpaces(input) {
    return input.trim().replace(/^ +| +$/gm, "");
  }

  static async scrape(url, jQueryFn) {
    const superagent = require("superagent");
    const cheerio = require("cheerio");

    try {
      // Do not change the value of this variable since jQueryFn will use it as a reference to cheerio
      const $ = await superagent.get(url).then(res => cheerio.load(res.text)); // eslint-disable-line

      // Eval is OK here since technically only the owner is the one able to set a scrape url and scrape sites anyway
      // Only way of traversing the HTML with the full potential of cheerio API without screwing up strings during string manipulation
      const result = eval(jQueryFn); // eslint-disable-line

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static stringToMillis(str) {
    if (typeof str !== "string") return null;

    const units = {
      "years": {
        "value": 3.154e+10,
        "abbreviations": ["y", "yr", "yrs", "year", "years"]
      },
      "months": {
        "value": 2.628e+9,
        "abbreviations": ["mo", "mos", "month", "months"]
      },
      "weeks": {
        "value": 6.048e+8,
        "abbreviations": ["w", "wk", "wks", "week", "weeks"]
      },
      "days": {
        "value": 8.64e+7,
        "abbreviations": ["d", "day", "days"]
      },
      "hours": {
        "value": 3.6e+6,
        "abbreviations": ["h", "hr", "hour", "hours"]
      },
      "minutes": {
        "value": 60000,
        "abbreviations": ["m", "min", "mins", "minute", "minutes"]
      },
      "seconds": {
        "value": 1000,
        "abbreviations": ["s", "sec", "secs", "second", "seconds"]
      }
    };

    const t = str.split(/(\d+)/);

    let ms = 0;

    str.replace(/[^\W\s]/gi, ""); // Remove whitespace and unicode from original input
    t.shift();

    for (let i = 0; i < t.length; i++) {
      if (!isNaN(t[i])) {
        if (!isNaN(t[i + 1])) return null;

        for (const unit in units) { // eslint-disable-line
          for (const abbrev of units[unit].abbreviations) {
            if (abbrev === t[i + 1]) ms += t[i] * units[unit].value;
          }
        }
      }
    }

    return ms;
  }
}

module.exports = Util;