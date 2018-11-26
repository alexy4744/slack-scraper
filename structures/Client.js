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

    this.web = new WebClient(this.token);
    this.rtm = new RTMClient(this.token);

    this.db = new JSONDatabase({
      filepath: "../database/settings.json"
    });

    this.commands = new CommandStore(this);
    this.events = new EventStore(this);
    this.inhibitors = new InhibitorStore(this);
    this.members = new MemberStore(this);
  }

  static async initialize(options = {}) {
    try {
      const self = new Client(options); // eslint-disable-line
      const startupTime = new Stopwatch();

      self.server = new Server(self, {
        ports: {
          http: 80
        }
      });

      await self.commands.loadAll();
      await self.events.listenAll();
      await self.inhibitors.loadAll();
      await self.rtm.start();

      self.startupTime = startupTime.stop().duration;

      return self;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Client;