const Event = require("../structures/Base/Event");
const Message = require("../structures/Base/Message");

class OnMessage extends Event {
  constructor(...args) {
    super(...args);
  }

  async run(msg) {
    if (msg.subtype === "message_changed") return this.client.rtm.emit("messageUpdated", msg);

    msg = this.utils.normalizeMessage(msg);

    const team = await this.client.teams.fetch().catch(error => ({ error }));
    if (team.error) return;
    const channel = await this.client.channels.fetch(msg.channel, team).catch(error => ({ error }));
    if (channel.error) return;
    const user = await this.client.users.fetch(msg.user, team).catch(error => ({ error }));
    if (user.error) return;

    msg = new Message(this.client, msg, channel, team, user);

    if (!msg.text.startsWith(this.client.prefix)) return;

    const args = msg.text
      .slice(this.client.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase(); // Shift the arguments so that it removes the command name, leaving only the command arguments

    if (this.client.commands.has(command)) return this.client.commands.get(command)._run(msg, args);
    else if (this.client.aliases.has(command)) return this.client.commands.get(this.client.aliases.get(command))._run(msg, args);
  }
}

module.exports = OnMessage;