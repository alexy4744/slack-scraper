const fs = require("fs-nextra");

module.exports = async client => {
  const tasks = await fs.readdir("./tasks").catch(error => ({ error }));
  if (tasks.error) throw tasks.error;

  for (let task of tasks) {
    task = task.slice(0, -3);
    client.tasks[task] = new (require(`../tasks/${task}`))(client);

    if (typeof client.tasks[task]._run === "function") client.tasks[task]._run();
  }
};