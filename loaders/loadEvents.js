const fs = require("fs-nextra");

module.exports = async client => {
  const events = await fs.readdir("./events").catch(error => ({ error }));
  if (events.error) throw events.error;

  for (let event of events) {
    event = event.slice(0, -3);

    client.events[event] = require(`../events/${event}`);
    client.rtm.on(event, (...args) => {
      if (!(typeof client.events[event] === "function")) return;
      client.events[event](...args, client); // Run the event with the given arguments as parameters
    });
  }
};