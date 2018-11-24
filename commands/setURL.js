const Command = require("../structures/Base/Command");

class SetURL extends Command {
  constructor(...args) {
    super(...args, {
      userPermissions: 1
    });
  }

  async run(msg, args) {
    if (!args[0]) return msg.channel.send(`You must supply a link of the site you want to scrape from!`);

    const link = args.join(" ");

    
  }
}

module.exports = SetURL;