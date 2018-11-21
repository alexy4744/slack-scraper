require("./structures/Bot").start();

process.on("uncaughtException", error => console.error(error));
process.on("unhandledRejection", (...args) => console.error(...args));