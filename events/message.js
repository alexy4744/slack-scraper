const Message = require("../structures/Message");

module.exports = (msg, client) => {
  if (msg.subtype === "message_changed") return;

  msg = new Message(client, msg);

  if (!msg.text.startsWith(client.prefix)) return;

  const command = msg.args.shift().toLowerCase(); // Shift the arguments so that it removes the command names, leaving only the command arguments
  if (!client.commands[command]) return; // If it isn't a valid command

  return client.commands[command](msg);
};