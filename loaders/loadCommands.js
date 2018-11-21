const fs = require("fs-nextra");

module.exports = async client => {
  const commands = await fs.readdir("./commands").catch(error => ({ error }));
  if (commands.error) throw commands.error;

  for (let command of commands) {
    command = command.slice(0, -3);
    client.commands[command] = require(`../commands/${command}`);
  }
};