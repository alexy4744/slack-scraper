const Event = require("../structures/Base/Event");

class OnReady extends Event {
  constructor(...args) {
    super(...args);
  }

  run() {
    return console.log("Bot is now ready!");
  }
}

module.exports = OnReady;