const Command = require("../structures/Base/Command");

class Ping extends Command {
  constructor(...args) {
    super(...args);
  }

  async run(msg) {
    let message;

    try {
      message = await msg.channel.send(`Checking my latency...`);
      const latency = Date.now() - this.utils.toDate(message.ts).getMilliseconds();
      return message.edit(`Latency: ${latency}`);
    } catch (error) {
      await message.delete().catch(() => { });
      return msg.channel.send(`An error has occured...\n\`\`\`\n${error}\n\`\`\``).catch(() => { });
    }
  }
}

module.exports = Ping;