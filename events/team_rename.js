const Event = require("../structures/Base/Event");

class OnTeamRename extends Event {
  constructor(...args) {
    super(...args);
  }

  run(name) {
    // name = name.name;
    // this.client.teans.set();
  }
}

module.exports = OnTeamRename;