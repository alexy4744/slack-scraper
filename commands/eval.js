/* eslint no-eval: 0 */

const util = require("util");
const superagent = require("superagent");

module.exports = async msg => {
  if (msg.user !== msg.client.owner) return; // Only let the bot owner be able to use this command

  let code = msg.args.join(" ");

  if (msg.args[0] === "async") code = `(async () => {\n${code.slice(6)}\n})();`;

  try {
    let evaled = eval(code);
    if (evaled instanceof Promise) evaled = await evaled;

    if (typeof evaled !== "string") {
      evaled = util.inspect(evaled, {
        depth: 0,
        showHidden: true
      });
    }

    evaled = evaled.replace(msg.client.token, "--redacted--");

    if (evaled.length < 40000) return msg.channel.send(`Input\n\`\`\`${code}\n\`\`\`\nOutput\n\`\`\`${evaled}\n\`\`\``, msg.channel);

    const url = await superagent.post(`https://hastebin.com/documents`).send(evaled).then(res => res.body.key);
    return msg.channel.send(`Result was over 40,000 characters, output uploaded to hastebin!\n\n${url}`);
  } catch (error) {
    return msg.channel.send(`Error!\n\`\`\`\n${error}\n\`\`\``);
  }
};