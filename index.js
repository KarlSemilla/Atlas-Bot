/*
    Using the Discord.js library to use the Discord API. https://discord.js.org/#/
*/
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const auth = require('./bot-token.json');

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

/* 
    Adding Guild Wars 2 API Wrapper.
// */
// const gw2 = require("./handlers/gw2-api.js");


client.on('ready', () => {
  console.log('Bot is active!');
});


client.on('message', (msg) => {
  //Checks if message contains prefix or if the bot is the author of the message; returns nothing.
  if(!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  
  //If message recieved is "!hello", returns Hello! back in the text chat.
  if(command === 'hello'){
    client.commands.get('hello').execute(msg, args);
  }

  //If message recieved is "!flip", returns a result of heads or tails back in the text chat.
  if(command === 'flip'){
    client.commands.get('flip').execute(msg, args);
  }

  /*This function will check if the message is "!giveaway", which will then proceed to add the user's tag(name.####)
  to a the giveaway table located on MongoDB.
  */
  if(command === 'giveaway'){
    client.commands.get('giveaway').execute(msg, client);
  }

});


client.login(auth.token);