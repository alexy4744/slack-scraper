/* eslint no-eval: 0 */

const Command = require("../structures/Base/Command");
const util = require("util");
const superagent = require("superagent");

class Eval extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["ev"],
      usage: ["console.log(\"Hello World!\""],
      description: "Evaluate JavaScript snippets",
      userPermissions: 1337
    });
  }

  async run(msg, args) {
    let code = args.join(" ");

    if (args[0] === "async") code = `(async () => {\n${code.slice(6)}\n})();`;

    try {
      let evaled = eval(code);
      if (evaled instanceof Promise) evaled = await evaled;

      if (!this.utils.isString(evaled)) {
        evaled = util.inspect(evaled, {
          depth: 0,
          showHidden: true
        });
      }

      evaled = evaled.replace(this.client.token, "--redacted--");

      if (evaled.length < 40000) return msg.channel.send(`Input\n\`\`\`${code}\n\`\`\`\nOutput\n\`\`\`${evaled}\n\`\`\``, msg.channel);

      const url = await superagent.post(`https://hastebin.com/documents`).send(evaled).then(res => res.body.key);
      return msg.channel.send(`Result was over 40,000 characters, output uploaded to hastebin!\n\n${url}`);
    } catch (error) {
      return msg.channel.send(`Error!\n\`\`\`\n${error}\n\`\`\``).catch(() => { });
    }
  }
}

module.exports = Eval;