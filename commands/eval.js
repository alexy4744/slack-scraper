/* eslint no-eval: 0 */

const Command = require("../structures/Command");
const util = require("util");
const superagent = require("superagent");

class Eval extends Command {
  constructor(...args) {
    super(...args, {
      permissions: 1337
    });
  }

  async run(ctx, args) {
    let code = args.join(" ");

    if (args[0] === "async") code = `(async () => {\n${code.slice(6)}\n})();`;

    try {
      let evaled = eval(code);
      if (evaled instanceof Promise) evaled = await evaled;

      if (typeof eval !== "string") {
        evaled = util.inspect(evaled, {
          depth: 0,
          showHidden: true
        });
      }

      evaled = evaled.replace(this.client.token, "--redacted--");

      if (evaled.length < 40000) {
        return ctx.body = {
          "text": `Input\n\`\`\`${code}\n\`\`\`\nOutput\n\`\`\`${evaled}\n\`\`\``
        };
      }

      const url = await superagent.post(`https://hastebin.com/documents`).send(evaled).then(res => res.body.key);
      return ctx.body = {
        "text": `Result was over 40,000 characters, output uploaded to hastebin!\n\n${url}`
      };
    } catch (error) {
      return ctx.body = {
        "text": `Error!\n\`\`\`\n${error.stack}\n\`\`\``
      };
    }
  }
}

module.exports = Eval;