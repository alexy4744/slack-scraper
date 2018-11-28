const RichMessage = require("./RichMessage");

class Command {
  constructor(client, options = {}) {
    this.name = options.name || this.constructor.name || null;
    if (!this.name) throw new Error("All commands must be named via the options object or have a named constructor!");
    else this.name = this.name.toLowerCase();

    this.client = client;
    this.permissions = options.permissions || 0;
  }

  run() {
    throw new Error(`No run method found for ${this.name}!`);
  }

  async _run(ctx) {
    try {
      const { user_id } = ctx.request.body; // eslint-disable-line
      ctx.request.body.user = await this.client.members.fetch(user_id);
      if (!this._runInhibitors(ctx)) return;
      const args = ctx.request.body.text.split(" ");
      return this.run(ctx, args);
    } catch (error) {
      ctx.body = new RichMessage().buildError(error);
    }
  }

  _runInhibitors(ctx) {
    const { command } = ctx.request.body;
    const cmd = this.client.commands.get(command.slice(1));

    let passed = 0;

    for (const inhibitor of this.client.inhibitors) {
      if (inhibitor[1].run(ctx, cmd)) passed++;
    }

    return passed > 0 ? true : false;
  }
}

module.exports = Command;