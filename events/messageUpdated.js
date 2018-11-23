const Event = require("../structures/Base/Event");

class OnMessageUpdate extends Event {
  constructor(...args) {
    super(...args);
  }

  run() {

  }
}

module.exports = OnMessageUpdate;