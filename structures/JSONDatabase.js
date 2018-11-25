const path = require("path");
const fs = require("fs-nextra");
const { isObject } = require("./Util");

class JSONDatabase {
  constructor(options = {}) {
    if (!options.filepath) throw new Error(`You must provide a file path for me to read/write from!`);

    this.filepath = path.join(__dirname, options.filepath);
    this.cache = {};
  }

  async write(what) {
    if (!isObject(what)) return Promise.reject(new Error(`Objects can only be written to JSON files!`));

    try {
      await fs.writeJSONAtomic(this.filepath, what, {
        spaces: 2
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /* Fetch from the database and also saves it as cache */
  fetch() {
    const data = require(this.filepath);
    this.cache = data;
    return data;
  }
}

module.exports = JSONDatabase;