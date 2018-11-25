const { WebClient } = require("@slack/client");
const SlashServer = require("./SlashServer");
const JSONDatabase = require("./JSONDatabase");

const MemberStore = require("../stores/MemberStore");
const InhibitorStore = require('../stores/InhibitorStore');
const CommandStore = require("../stores/CommandStore");

const Stopwatch = require("./Stopwatch");

class Client extends WebClient {
  constructor(options) {
    if (!options.token) throw new Error(`You must pass in a token via the options object in the Client constructor!`);
    super(options.token);

    this.token = options.token;

    this.db = new JSONDatabase({
      filepath: "../database/settings.json"
    });

    this.commands = new CommandStore(this);
    this.inhibitors = new InhibitorStore(this);
    this.members = new MemberStore(this);
  }

  static async initialize(options = {}) {
    try {
      const self = new Client(options); // eslint-disable-line
      const startupTime = new Stopwatch();

      await self.commands.loadAll();

      self.server = new SlashServer(self, {
        ports: {
          http: 80
        }
      });

      self.startupTime = startupTime.stop().duration;

      return self;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Client;