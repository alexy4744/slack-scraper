const fs = require("fs-nextra");

module.exports = async client => {
  const events = await fs.readdir("./events").catch(error => ({ error }));
  if (events.error) throw events.error;

  for (let event of events) {
    event = event.slice(0, -3);

    try {
      client.events.listen(event);
    } catch (_) {
      continue;
    }
  }
};