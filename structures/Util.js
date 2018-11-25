class Util {
  constructor() {
    throw new Error(`You should not be creating a new instance of Util!`);
  }

  static isObject(input) {
    if (input.constructor && input.constructor === Object) return true;
    return false;
  }
}

module.exports = Util;