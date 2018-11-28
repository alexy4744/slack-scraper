# Slack Scraper

A self hosted Slack bot that allows you to scrape websites occasionally for data and then sending it to designated slack channels.

It makes use of [Koa](https://koajs.com/) to handle incoming [slash commands](https://api.slack.com/slash-commands) from Slack, and [Cheerio](https://cheerio.js.org/) as jQuery to traverse and query the requested HTML.

Cheerio functions are ran with **eval()**, so be careful of what you place as your function parameters, you can always test with the `/scrape` command first before running `/addurl` to save it as a task to ensure the result doesn't have anything that shouldn't be there. Only the bot owner can run these commands btw.

Eval is used so that you can get the full potential of the Cheerio API, rather than doing some crazy string manipulation that might lose out on features or it doesn't get parsed correctly. As long as you know jQuery, you can tell the bot to scrape whatever you want.

All commands responses are sent as ephemeral messages, **except** the web scraping task, those are sent to the channel which is why you need to be careful of what the result returns.

## TODO
1. Bot should run with 2 different processes, one which is the main process and the other one should be a *forked* child process. The forked child process should be dedicated to handling tasks that might block the thread especially for things that are repeated at fast intervals, therefore offloading it to a seperate process other than the main process that the bot lives on should be better.

2. Maybe find another way other than using eval() to execute Cheerio functions?

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