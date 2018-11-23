const fs = require("fs-nextra");

module.exports = async client => {
  const inhibitors = await fs.readdir("./inhibitors").catch(error => ({ error }));
  if (inhibitors.error) throw inhibitors.error;

  for (let inhibitor of inhibitors) {
    inhibitor = new (require(`../inhibitors/${inhibitor}`))(client);
    client.inhibitors.add(inhibitor.name.toLowerCase(), inhibitor);
  }
};