
const { RTMClient, WebClient } = require("@slack/client");
const Server = require("./Server");
const JSONDatabase = require("./JSONDatabase");

const CommandStore = require("../stores/CommandStore");
const EventStore = require("../stores/EventStore");
const InhibitorStore = require("../stores/InhibitorStore");
const MemberStore = require("../stores/MemberStore");

const Stopwatch = require("./Stopwatch");

class Client {
  constructor(options) {
    if (!options.token) throw new Error(`You must pass in a token via the options object in the Client constructor!`);

    this.token = options.token;
    this.owner = options.owner;

    this.web = new WebClient(this.token);
    this.rtm = new RTMClient(this.token);

    this.db = new JSONDatabase({
      filepath: "../database/settings.json"
    });

    this.commands = new CommandStore(this);
    this.events = new EventStore(this);
    this.inhibitors = new InhibitorStore(this);
    this.members = new MemberStore(this);

    /* Used in rich messages */
    this.colors = {
      primary: "#5089DB",
      success: "#76B354",
      fail: "#DE2E43"
    };

    this.emojis = {
      success: "✅ ｜ ",
      fail: "❌ ｜ ",
      divider: " ｜ "
    };
    /* --------------------- */
  }

  static async initialize(options = {}) {
    try {
      const self = new Client(options); // eslint-disable-line
      const startupTime = new Stopwatch();

      await self.commands.loadAll();
      await self.events.listenAll();
      await self.inhibitors.loadAll();
      await self.rtm.start();

      self.server = new Server(self, {
        ports: {
          http: 80
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