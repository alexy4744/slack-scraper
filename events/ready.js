const Event = require("../structures/Event");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      name: "ready"
    });
  }

  listen() {
    console.log(`⏱  Startup took \x1b[34m${this.client.startupTime.toString()}\x1b[0m`);
    console.log("🚀  Bot is now \x1b[32mready!\x1b[32m");
  }
};