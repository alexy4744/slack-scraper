const path = require("path");
const fs = require("fs-nextra");
const merge = require("merge-deep");
const { isObject } = require("./Util");
const EventEmitter = require("events");

class JSONDatabase extends EventEmitter {
  constructor(client, options = {}) {
    super();
    if (!options.filepath) throw new Error(`You must provide a file path for me to read/write from!`);

    this.client = client;
    this.filepath = path.join(__dirname, options.filepath);
    this.cache = {};
  }

  static async initalize(client, options = {}) {
    const self = new JSONDatabase(client, options); // eslint-disable-line

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

      this.cache = what;
      this.emit("write", this.cache);

      return Promise.resolve(this);
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
      const data = await this.fetch();
      await this.write(merge(data, what));
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = JSONDatabase;