const { permissions } = require("../Constants");

class Permissions {
  constructor(user) {
    this.user = user;
    this._permissions = this._filterUserObject();
  }

  static get CONSTANTS() {
    return permissions;
  }

  get level() {
    let level = 0;

    for (const permission in this._permissions) {
      if (this._permissions[permission]) level += permissions[permission];
    }

    return level;
  }

  get highest() {
    let highest = 0;

    for (const permission in this._permissions) {
      if (this._permissions[permission] && permissions[permission] > highest) highest = permissions[permission];
    }

    return highest;
  }

  /* Convert strings to numbers for perms */
  normalize(input) {
    if (!this.utils.isString(input)) return null;
    if (permissions[input]) return permissions[input];
  }

  _filterUserObject() {
    const desiredFields = Object.keys(permissions);
    const result = {};

    for (const field in this.user) {
      if (desiredFields.includes(field)) result[field] = this.user[field];
    }

    return result;
  }
}

module.exports = Permissions;