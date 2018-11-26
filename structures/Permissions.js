const { permissions } = require("./Constants");

class Permissions {
  constructor(member) {
    this.member = member;
    this._permissions = this._filterMemberObject();
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

  _filterMemberObject() {
    const desiredFields = Object.keys(permissions);
    const result = {};

    for (const field in this.member) {
      if (desiredFields.includes(field)) result[field] = this.member[field];
    }

    return result;
  }
}

module.exports = Permissions;