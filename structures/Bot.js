const fs = require("fs-nextra");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./process.env") });

const { RTMClient, WebClient } = require("@slack/client");
const JSONDatabase = require("./JSONDatabase");

class Bot {
  constructor(options = {}) {
    this.token = process.env.SLACK_TOKEN || options.token;
    this.rtm = new RTMClient(this.token);
    this.web = new WebClient(this.token);
    this.db = new JSONDatabase();
    this.prefix = process.env.PREFIX || options.prefix || "!";
    this.events = {};
    this.commands = {};
    this.tasks = {};
    this.cache = {
      users: new Map()
    };
  }

  static async start() {
    const self = new Bot(); // eslint-disable-line
    await self.rtm.start();
    await self.loadAll();
    return self;
  }

  async loadAll() {
    const loaders = await fs.readdir("./loaders").catch(error => ({ error }));
    if (loaders.error) throw loaders.error;

    for (const loader of loaders) require(`./loaders/${loader}`)(this);

    return this;
  }
}

module.exports = Bot;