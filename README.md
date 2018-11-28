# Slack Scraper

A self hosted Slack bot that allows you to scrape websites occasionally for data and then sending it to designated slack channels.

It makes use of [Koa](https://koajs.com/) to handle incoming [slash commands](https://api.slack.com/slash-commands) from Slack, and [Cheerio](https://cheerio.js.org/) as jQuery to traverse and query the requested HTML.

## TODO
1. Bot should run with 2 different processes, one which is the main process and the other one should be a *forked* child process. The forked child process should be dedicated to handling tasks that might block the thread especially for things that are repeated at fast intervals, therefore offloading it to a seperate process other than the main process that the bot lives on should be better.

## Setting Up
1. Clone this repository
	```bash
	git clone https://github.com/alexy4744/slack-scraper.git
	```
2. CD into the cloned repository and install the dependencies
	```bash
	npm i
	```
3. Create a new app [here](https://api.slack.com/apps) and obtain the *Bot User OAuth Access Token* under **OAuth & Permissions**

4. While you're here, go to **Slash Commands** and add each command to it.

4. Find your user ID

5. Rename `process.env.EXAMPLE` to `process.env` and place your user id and bot token in the empty fields

6. Add the bot to your workspace

7. Run `node .` to start the bot and run `/ping` to verify that the bot is online and working