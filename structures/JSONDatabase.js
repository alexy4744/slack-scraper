const Base = require("./Base/Base");
const fs = require("fs-nextra");

class JSONDatabase extends Base {
  constructor(client, options = {}) {
    super(client);
    this.initalized = false;
    this.settings = options.filenames && options.filenames.teams ? options.filenames.teams : "settings";
    this.cache = {
      [this.settings]: new Map()
    };
  }

  static async initalize(client) {
    try {
      const self = new JSONDatabase(client); // eslint-disable-line
      const databases = await fs.readdir("./database");

      for (const database of databases) {
        const data = require(`../database/${database}`);
        for (const key in data) self.cache[database.slice(0, -5)].set(key, data[key]);
      }

      self.initalized = true;

      return self;
    } catch (error) {
      throw new Error(error);
    }
  }

  async write(key, value, where) {
    if (!this.utils.isString(key)) return Promise.reject(new Error(`'key' needs to be a string or number, but received ${typeof key}`));
    if (!this.utils.isObject(value)) return Promise.reject(new Error(`'value' needs to be an object but received ${value}`));
    if (!this.utils.isString(where)) return Promise.reject(new Error(`'where' must be valid database name string`));

    try {
      await fs.writeJSONAtomic(`./database/${where}.json`, value);
      this.cache[where].set(key, value);
      return Promise.resolve(this);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get(key, where) {
    if (!this.utils.isString(key)) return Promise.reject(new Error(`'key' needs to be a string or number, but received ${typeof key}`));
    if (!this.utils.isString(where)) return Promise.reject(new Error(`'where' must be valid database name string`));

    try {
      const json = this.cache[where].has(key) ? this.cache[where].get(key) : await this.fetch(key, where);
      return Promise.resolve(json);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async fetch(key, where) {
    if (!this.utils.isString(key)) return Promise.reject(new Error(`'key' needs to be a string or number, but received ${typeof key}`));
    if (!this.utils.isString(where)) return Promise.reject(new Error(`'where' must be valid database name string`));

    try {
      const json = await fs.readJSON(`./database/${where}.json`).then(data => data[key]);
      if (json) this.cache[where].set(key, json);
      return Promise.resolve(json);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(key, value, where) {
    try {
      let json = await this.get(key, where);

      if (!json) {
        await this.write(key, value, where);
        return;
      }

      json = { ...json, ...value };

      await this.write(key, json, where);

      return json;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(key, where) {
    try {
      const json = await this.get(key, where);

      delete json[key];

      await this.write(key, json, where);

      return json;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

module.exports = JSONDatabase;