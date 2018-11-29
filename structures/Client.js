const { RTMClient, WebClient } = require("@slack/client");
const Server = require("./Server");
const JSONDatabase = require("./JSONDatabase");

const CommandStore = require("../stores/CommandStore");
const EventStore = require("../stores/EventStore");
const InhibitorStore = require("../stores/InhibitorStore");
const MemberStore = require("../stores/MemberStore");
const TaskStore = require("../stores/TaskStore");

const Stopwatch = require("./Stopwatch");

class Client {
  constructor(options = {}) {
    this.token = process.env.SLACK_TOKEN || options.token || null;
    if (!this.token) throw new Error(`You must specify a token as your environment variable or pass in a token via the options object in the Client constructor!`);

    this.owner = process.env.OWNER || options.owner || null;
    if (!this.owner) throw new Error(`You must specify a user id as your environment variable or pass in a user id via the options object in the Client constructor!`);

    this.web = new WebClient(this.token);
    this.rtm = new RTMClient(this.token);

    this.commands = new CommandStore(this);
    this.events = new EventStore(this);
    this.inhibitors = new InhibitorStore(this);
    this.members = new MemberStore(this);
    this.tasks = new TaskStore(this);

    /* Used in rich messages */
    this.colors = {
      primary: "#5089DB",
      success: "#76B354",
      fail: "#DE2E43",
      pending: "#FFAC32"
    };

    this.emojis = {
      success: "✅ ｜ ",
      fail: "❌ ｜ ",
      pending: "⏳ ｜ ",
      divider: " ｜ "
    };
  }

  static async initialize(options = {}) {
    try {
      const self = new Client(options); // eslint-disable-line
      const startupTime = new Stopwatch();

      await self.commands.loadAll();
      await self.events.listenAll();
      await self.inhibitors.loadAll();
      await self.tasks.runAll();
      await self.rtm.start();

      self.db = await JSONDatabase.initalize(self, {
        filepath: "../database/settings.json"
      });

      self.server = new Server(self, {
        ports: {
          http: process.env.HTTP || 80,
          https: process.env.HTTPS || 443
        }
      });

      self.startupTime = startupTime.stop();

      return self;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Client;