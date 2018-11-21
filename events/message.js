const Message = require("../structures/Message");

module.exports = (msg, client) => {
  msg = new Message(client, msg);

  if (!msg.text.startsWith(client.prefix)) return;

  const args = msg.text.slice(client.prefix.length).trim().split(/ +/g); // Split the message content by every space
  const command = args.shift().toLowerCase(); // Shift the arguments so that it removes the command names, leaving only the command arguments
  if (!client.commands[command]) return; // If it isn't a valid command

  return client.commands[command](client, msg, args);
};