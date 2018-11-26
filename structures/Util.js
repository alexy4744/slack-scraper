class Util {
  constructor() {
    throw new Error(`You should not be creating a new instance of Util!`);
  }

  static isObject(input) {
    if (input.constructor && input.constructor === Object) return true;
    return false;
  }

  /* Make consistent spaces by removing multiple unnecessary spaces i.e. double space */
  // https://stackoverflow.com/questions/8927844/trimming-spaces-while-preserving-line-breaks
  static normalizeSpaces(input) {
    return input.trim().replace(/^ +| +$/gm, "");
  }
}

module.exports = Util;