
/* A Koa server to handle incoming slash commands */

const http = require("http");
const https = require("https");

const Koa = require("koa");

class SlashServer extends Koa {
  constructor(client, options = {}) {
    super();
    this.client = client;
    this.ports = options.ports;
    this.certificates = options.certificates || null;

    this._initalize();
  }

  _initalize() {
    this._loadAllRoutes();

    http.createServer(this.callback()).listen(this.ports.http, () => console.log(`Server started on port ${this.ports.http} (HTTP)`));

    if (Array.isArray(this.certificates)) {
      https.createServer(this.certificates, this.callback()).listen(this.ports.https, () => console.log(`Server started on port ${this.ports.https} (HTTPS)`))
    }
  }

  /* Commands are essentially routes */
  _loadAllRoutes() {
    for (const command of this.client.commands) {
      this.use((ctx, next) => {
        if (ctx.request.method !== "POST") return; // Slack only sends POST request to run slash commands
        const paths = ctx.request.path.split("/").slice(1);
        if (paths[0] !== "commands") return;
        return command[1]._run(ctx, next);
      });
    }
  }
}

module.exports = SlashServer;