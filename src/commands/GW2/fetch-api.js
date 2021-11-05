const { SlashCommandBuilder } = require("@discordjs/builders");
const gw2Client = require("gw2api-client");
const accountTemplate = require("../../embed-templates/accountTemplate.js");
const interactionCreate = require("../../events/interactionCreate.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("fetch-api")
		.setDescription("This command fetches Guild Wars 2 information"),
	async execute(interaction, key) {
		let gw2 = gw2Client();
		const user = gw2.authenticate(key);

		let userInfo;
		//gw2.items().get(86098).then(items => message.channel.send(items.name));
		userInfo = {
			account: await user.account().get(),
			luck: await user.account().luck().get(),
			masteries: await user.account().mastery().points().get(),
			world: await gw2.worlds().all(),
		};

		interaction.reply(accountTemplate(message, userInfo));
	},
};
