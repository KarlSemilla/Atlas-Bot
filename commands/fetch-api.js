const gw2Client = require('gw2api-client');
const accountTemplate = require('../embed-templates/accountTemplate');

module.exports = {
    name: 'fetch-api',
    description: 'This command fetches Guild Wars 2 information',
    async execute(message, args, key){
        let gw2 = gw2Client();
        const user = gw2.authenticate(key);
        
        let userInfo;
        //gw2.items().get(86098).then(items => message.channel.send(items.name));
        userInfo = {account: await user.account().get(),
            luck: await user.account().luck().get(),
            masteries: await user.account().mastery().points().get(),
            world: await gw2.worlds().all()
        };

        message.channel.send(accountTemplate(message, userInfo));
    }
}


