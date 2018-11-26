const Event = require("../structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "ready"
    });
  }

  listen() {
    console.log("Bot is now ready!");
    console.log(`Startup took ${this.client.startupTime.toString()}`);
  }
};