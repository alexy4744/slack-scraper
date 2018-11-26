/* A Koa server to handle incoming slash commands */

const http = require("http");
const https = require("https");

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const commands = new Router();

class Server extends Koa {
  constructor(client, options = {}) {
    super();
    this.client = client;
    this.ports = options.ports;
    this.certificates = options.certificates || null;

    this._initalize();
  }

  _initalize() {
    this.use(bodyParser());
    this._loadCommandRoutes();
    this.use(commands.routes());

    http.createServer(this.callback()).listen(this.ports.http, () => console.log(`🌎  Server started on port ${this.ports.http} (HTTP)`));

    if (Array.isArray(this.certificates)) {
      https.createServer(this.certificates, this.callback()).listen(this.ports.https, () => console.log(`🌎  Server started on port ${this.ports.https} (HTTPS)`))
    }
  }

  _loadCommandRoutes() {
    /* For each command loaded, create a Koa middleware out of it */
    for (const command of this.client.commands) {
      commands.post(`/commands/${command[0]}`, ctx => command[1]._run(ctx));
    }
  }
}

module.exports = Server;