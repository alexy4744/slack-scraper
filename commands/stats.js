const Command = require("../structures/Command");
const RichMessage = require("../structures/RichMessage");
const { normalizeSpaces } = require("../structures/Util");
const os = require("os-utils");

class Stats extends Command {
  constructor(...args) {
    super(...args);
  }

  run(ctx) {
    ctx.body = new RichMessage()
      .setColor(this.client.colors.primary)
      .setTitle("🖥 ｜ Statistics")
      .setText(normalizeSpaces(`
        Memory Usage: *${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${os.totalmem} MB*\n
        Free Memory: *${os.freemem} MB*\n
        Platform: \`${os.platform}\``))
      .message;
  }
}

module.exports = Stats;