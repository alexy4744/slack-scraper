const Event = require("../structures/Base/Event");

class OnReady extends Event {
  constructor(...args) {
    super(...args);
  }

  run() {
    console.log("Bot is now ready!");
    console.log(`Startup took ${this.client.startupTime.toString()}`);
  }
}

module.exports = OnReady;