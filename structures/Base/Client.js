const fs = require("fs-nextra");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../process.env") });

const { RTMClient, WebClient } = require("@slack/client");

const AliasStore = require("../../stores/AliasStore");
const ChannelStore = require("../../stores/ChannelStore");
const CommandStore = require("../../stores/CommandStore");
const EventStore = require("../../stores/EventStore");
const InhibitorStore = require("../../stores/InhibitorStore");
const TaskStore = require("../../stores/TaskStore");
const UserStore = require("../../stores/UserStore");

const User = require("../../structures/Base/User");

const JSONDatabase = require("../JSONDatabase");

class Client {
  constructor(options = {}) {
    this.prefix = process.env.PREFIX || options.prefix || "!";

    this.token = process.env.SLACK_TOKEN || options.token || null;
    if (!this.token) throw new Error(`A Slack API token must be provided as an enviroment variable or via the options object from Client constructor`);

    this.owner = process.env.OWNER || options.owner || null;
    if (!this.owner) throw new Error(`An owner ID must be provided as an enviroment variable or via options object from Client constructor`);

    this.rtm = new RTMClient(this.token);
    this.web = new WebClient(this.token);

    this.aliases = new AliasStore(this);
    this.channels = new ChannelStore(this);
    this.commands = new CommandStore(this);
    this.events = new EventStore(this);
    this.inhibitors = new InhibitorStore(this);
    this.tasks = new TaskStore(this);
    this.users = new UserStore(this);
  }

  static async start() {
    const self = new Client(); // eslint-disable-line

    self.db = await JSONDatabase.initalize(self);

    await self.loadAll();
    await self.fetchAllUsers();
    await self.rtm.start();

    return self;
  }

  async loadAll() {
    const loaders = await fs.readdir("./loaders").catch(error => ({ error }));
    if (loaders.error) throw loaders.error;

    for (const loader of loaders) require(`../../loaders/${loader}`)(this);
  }

  async fetchAllUsers() {
    const allUsers = await this.web.users.list()
      .then(res => res.members)
      .catch(error => ({ error }));
    if (allUsers.error) throw allUsers.error;

    for (const user of allUsers) {
      if (user.id === this.owner) user.bot_owner = true; // eslint-disable-line
      this.users.set(user.id, new User(this, user));
    }

    return this.users;
  }
}

module.exports = Client;