/*
    Using the Discord.js library to use the Discord API. https://discord.js.org/#/
*/
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require("fs");

client.commands = new Collection();

require("dotenv").config();

const functions = fs
	.readdirSync("./src/functions/")
	.filter((file) => file.endsWith(".js"));

const eventFiles = fs
	.readdirSync("./src/events/")
	.filter((file) => file.endsWith(".js"));

const commandFolders = fs.readdirSync("./src/commands");

/* 
    Adding Guild Wars 2 API Wrapper.
*/
//const gw2 = require("./handlers/gw2-api.js");

(async () => {
	for (file of functions) {
		require(`./functions/${file}`)(client);
	}
	client.handleEvents(eventFiles, "./src/events");
	client.handleCommands(commandFolders, "./src/commands");
	client.login(process.env.token);
})();
