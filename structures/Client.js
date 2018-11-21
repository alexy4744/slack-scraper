const fs = require("fs-nextra");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../process.env") });

const { RTMClient, WebClient } = require("@slack/client");
const JSONDatabase = require("./JSONDatabase");

class Client {
  constructor(options = {}) {
    this.token = process.env.SLACK_TOKEN || options.token || null;
    if (!this.token) throw new Error(`A Slack API token must be provided as an enviroment variable or via the options object from Client constructor`);

    this.owner = process.env.OWNER || options.owner || null;
    if (!this.owner) throw new Error(`An owner ID must be provided as an enviroment variable or via options object from Client constructor`);

    this.rtm = new RTMClient(this.token);
    this.web = new WebClient(this.token);
    this.prefix = process.env.PREFIX || options.prefix || "!";
    this.events = {};
    this.commands = {};
    this.tasks = {};
    this.cache = {
      users: new Map()
    };
  }

  static async start() {
    const self = new Client(); // eslint-disable-line

    self.db = await JSONDatabase.initalize(self);

    await self.rtm.start();
    await self.loadAll();

    return self;
  }

  async loadAll() {
    const loaders = await fs.readdir("./loaders").catch(error => ({ error }));
    if (loaders.error) throw loaders.error;

    for (const loader of loaders) require(`../loaders/${loader}`)(this);

    return this;
  }
}

module.exports = Client;