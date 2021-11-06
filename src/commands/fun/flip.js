//Added a coin-toss module from https://www.npmjs.com/package/coin-toss
const { SlashCommandBuilder } = require("@discordjs/builders");
const coin = require("coin-toss");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("flip")
		.setDescription(
			'This command flips a coin and decides whether the outcome will be "Heads" or "Tails"'
		),
	async execute(interaction) {
		interaction.reply("🪙 " + coin.toss());
	},
};
