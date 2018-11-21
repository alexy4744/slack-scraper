module.exports = class Util {
  constructor() {
    throw new Error("Cannot create new instance for Util");
  }

  static isString(input) {
    return typeof input === "string";
  }

  static isNumber(input) {
    return typeof input === "number";
  }

  static isObject(input) {
    if (input.constructor && input.constructor === Object) return true;
    return false;
  }

  static async scrape() {

  }
};