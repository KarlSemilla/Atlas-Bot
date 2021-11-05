/*
    Using the Discord.js library to use the Discord API. https://discord.js.org/#/
*/
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require("fs");

client.commands = new Collection();
require("dotenv").config();
// const config = require("./config.json");
// const auth = require("./bot-token.json");

const handlers = fs
	.readdirSync("./src/functions/")
	.filter((file) => file.endsWith(".js"));

const eventFiles = fs
	.readdirSync("./src/events/")
	.filter((file) => file.endsWith(".js"));

const commandFolders = fs.readdirSync("./src/commands");

// for (const file of commandFiles) {
// 	const command = require(`./commands/${file}`);
// 	client.commands.set(command.name, command);
// }

/* 
    Adding Guild Wars 2 API Wrapper.
*/
//const gw2 = require("./handlers/gw2-api.js");

client.once("ready", () => {
	console.log("Bot is active!");
});

(async () => {
	for (file of handlers) {
		require(`./functions/${file}`)(client);
	}
	client.handleEvents(eventFiles, "./src/events");
	client.handleCommands(commandFolders, "./src/commands");
	client.login(process.env.token);
})();

//Commands rework.
// client.on('interactionCreate', async interaction => {
//   if(!interaction.isCommand()) return;
//   const {command} = interaction

//   //If message recieved is "!hello", returns Hello! back in the text chat.
//   if(command === 'hello'){
//     interaction.commands.get('hello').execute(msg, args);
//     await interaction.reply()
//   }

//   //If message recieved is "!flip", returns a result of heads or tails back in the text chat.
//   if(command === 'flip'){
//     client.commands.get('flip').execute(msg, args);
//   }

//   /*This function will check if the message is "!giveaway", which will then proceed to add the user's tag(name.####)
//   to a the giveaway table located on MongoDB.
//   */
//   if(command === 'giveaway'){
//     client.commands.get('giveaway').execute(msg, client);
//   }

//   if(command === 'api'){
//     client.commands.get('fetch-api').execute(msg, client, config.apiKey);
//   }
// });

// client.login(auth.token);
