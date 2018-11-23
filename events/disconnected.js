const Event = require("../structures/Base/Event");

class OnDisconnection extends Event {
  constructor(...args) {
    super(...args);
  }

  run() {
    return console.warn("RTM has been disconnected!");
  }
}

module.exports = OnDisconnection;