class Command {
  constructor(client, options = {}) {
    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All commands must be named via the options object or have a named constructor!");

    this.client = client;
    this.permissions = options.permissions || 0;
  }

  run() {
    throw new Error(`No run method found for ${this.name}!`);
  }

  _run(ctx, next) {
    // return ctx.body = "AYYY"
    // return next();
    // ctx.response.status = 200;
    ctx.body = {
      "text": "It's 80 degrees right now.",
      "attachments": [
        {
          "text": "Partly cloudy today and tomorrow"
        }
      ]
    }
    if (!this._runInhibitors(ctx)) return;
    return this.run(ctx, next);
  }

  _runInhibitors(ctx) {
    let passed = 0;

    for (const inhibitor of this.client.inhibitors) {
      if (inhibitor[1].run(ctx)) passed++;
    }

    return passed > 0 ? true : false;
  }
}

module.exports = Command;