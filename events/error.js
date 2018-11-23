const Event = require("../structures/Base/Event");

class OnError extends Event {
  constructor(...args) {
    super(...args);
  }

  run(error) {
    return console.error(error);
  }
}

module.exports = OnError;