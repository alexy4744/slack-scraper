const Base = require("./Base");
const fs = require("fs-nextra");

class JSONDatabase extends Base {
  constructor(client, options = {}) {
    super(client);
    this.client = client;
    this.teams = options.filenames.teams || "teams";
    this.users = options.filenames.users || "users";
  }

  async write(key, value, where) {
    if (!this.utils.isNumber(key) || !this.utils.isString(key)) return Promise.reject(new Error(`'key' needs to be a string or number, but received ${typeof key}`));
    if (!this.utils.isObject(value)) return Promise.reject(new Error(`'value' needs to be an object but received ${value}`));
    if (!this.utils.isString(where)) return Promise.reject(new Error(`'where' must be valid database name string`));

    try {
      await fs.writeJSONAtomic(`../database/${where}`, value, {
        spaces: 2
      });
      return Promise.resolve(this);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get(key, where) {
    if (!this.utils.isNumber(key) || !this.utils.isString(key)) return Promise.reject(new Error(`'key' needs to be a string or number, but received ${typeof key}`));
    if (!this.utils.isString(where)) return Promise.reject(new Error(`'where' must be valid database name string`));

    try {
      const json = await fs.readJSON(`../database/${where}`).then(data => data[key]);
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

      json = {
        ...json,
        value
      };

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