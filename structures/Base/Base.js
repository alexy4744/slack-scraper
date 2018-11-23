const Util = require("../Util");

class Base {
  constructor(client) {
    this.client = client;
    this.utils = Util;
  }
}

module.exports = Base;