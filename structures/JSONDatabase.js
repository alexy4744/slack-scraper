const path = require("path");
const fs = require("fs-nextra");
const { isObject } = require("./Util");

class JSONDatabase {
  constructor(options = {}) {
    if (!options.filepath) throw new Error(`You must provide a file path for me to read/write from!`);

    this.filepath = path.join(__dirname, options.filepath);
    this.cache = {};
  }

  static async initalize(options = {}) {
    const self = new JSONDatabase(options); // eslint-disable-line

    try {
      await self.fetch();
    } catch (error) {
      throw error;
    }

    return self;
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
  async fetch() {
    const data = await fs.readJSON(this.filepath).catch(error => ({ error }));
    if (data.error) return Promise.reject(data.error);
    this.cache = data;
    return Promise.resolve(data);
  }

  async update(what) {
    if (!isObject(what)) return Promise.reject(new Error(`Objects can only be written to JSON files!`));

    try {
      let data = await this.fetch();
      data = { ...data, ...what };
      await this.write(data);
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = JSONDatabase;