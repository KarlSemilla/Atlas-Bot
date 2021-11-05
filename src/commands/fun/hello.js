const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hello")
		.setDescription('This command returns a "Hello!" from the bot'),
	execute(message, args) {
		message.channel.send("Hello!");
	},
};
