const path = require("path");
const dotenv = require("dotenv");
const Client = require("./structures/Client");

dotenv.config({ path: path.join(__dirname, "./process.env") });

Client.initialize({
  token: process.env.SLACK_TOKEN
});

process.on("uncaughtException", (...args) => console.error(...args));
process.on("unhandledRejection", (...args) => console.error(...args));