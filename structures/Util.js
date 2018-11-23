class Util {
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

  /* If the message was sent by the API, rebuild the object to that it is similar to the object payload sent by RTM. */
  static normalizeMessage(rawMessage) {
    if (!rawMessage.message) return rawMessage;
    return {
      channel: rawMessage.channel,
      ...rawMessage.message
    };
  }

  static async scrape() {

  }
}

module.exports = Util;