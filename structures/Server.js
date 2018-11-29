/* A Koa server to handle incoming slash commands */

const http = require("http");
const https = require("https");

const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

class Server extends Koa {
  constructor(client, options = {}) {
    super();
    this.client = client;
    this.ports = options.ports;
    this.certificates = options.certificates || null;

    this.commands = new Router();

    this._initalize();
  }

  _initalize() {
    this.use(bodyParser());
    this._loadCommandRoutes();
    this.use(this.commands.routes());

    http.createServer(this.callback()).listen(this.ports.http, () => console.log(`🌎  Server started on port \x1b[34m${this.ports.http}\x1b[0m (HTTP)`));

    if (this.certificates) {
      if (!this.certificates.key || !this.certificates.cert) throw new Error(`You must provide both the key and the certificate in order to run the server as HTTPS!`);
      else https.createServer(this.certificates, this.callback()).listen(this.ports.https, () => console.log(`🌎  Server started on port \x1b[34m${this.ports.https}\x1b[0m (HTTPS)`));
    }
  }

  _loadCommandRoutes() {
    /* For each command loaded, create a Koa middleware out of it */
    for (const command of this.client.commands) {
      this.commands.post(`/commands/${command[0]}`, ctx => command[1]._run(ctx));
    }
  }
}

module.exports = Server;