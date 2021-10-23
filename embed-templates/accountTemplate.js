const client = require('discord.js')

module.exports = (message, userInfo) => {
    let masteryLevel = 0;
    for(const mast of userInfo.masteries.totals){
        masteryLevel += mast.spent;
    }

    const accountEmbed = new client.MessageEmbed()
        .setAuthor(userInfo.account.name, message.author.avatarURL())
        .setColor('#FF007F')
        .setTitle('Account Info')
        .addFields({name: "Account Created", value: userInfo.account.created.substring(0, 10), inline: false})
        //.addFields({name: "World", value: userInfo.world.find(world =>{ world =  world.equals(userInfo.account.world)}), inline: true})

        .addFields({name: "Mastery Level", value: masteryLevel, inline: true})
        .addFields({name: "Fractal Level", value: userInfo.account.fractal_level, inline: true})
        .addFields({name: "WvW Rank", value: userInfo.account.wvw_rank, inline: true})
        // .addFields({name: "Achievement Points", value: userInfo.achievements().max, inline: true})
        //.addFields({name: "Luck", value: userInfo.luck, inline: true})
        
    return accountEmbed
    
}
