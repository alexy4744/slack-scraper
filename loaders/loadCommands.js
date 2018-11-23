const fs = require("fs-nextra");

module.exports = async client => {
  const commands = await fs.readdir("./commands").catch(error => ({ error }));
  if (commands.error) throw commands.error;

  for (let command of commands) {
    command = client.commands.resolve(command);

    client.commands.add(command.name, command);

    if (command.aliases.length) {
      for (const alias of command.aliases) client.aliases.link(alias, command.name);
    }
  }
};