//Giveaway module that takes the user's Discord ID and puts it into the Database for a giveaway.
const mongo = require('../handlers/mongo.js');
const mongoose = require('mongoose');
const giveawaySchema = require('../schemas/giveaway-schema');
const giveawayTimer = require('../handlers/giveaway-timer');

const giveawayMessage =`
**[AnE] Weekly Guild Giveaway signups are now open!**

Enrollment is open from now until 1 hour after reset on Sunday night (Monday morning for those on the east half of the world). The possible rewards can be seen in our guild's Deep Cave (last tab in the guild bank) and range anywhere from 1 to 80 gold in value*. The rules are simple:
1) Guild Members only (no officers or leaders can enter)
2) Must have account name in Discord nickname to be eligible to win

*The Gold Ore prizes are actually that amount of Gold Coins. The Holographic Super Cake is a placeholder for your choice of Super Weapon skin

There is no entry fee, just need to click the Reaction on this post.`;

module.exports = {
    name: 'giveaway',
    description: 'This function will send a giveaway message determined by the individual calling the command and ask for a message to send out to a channel.' +
        'The message sent will come with a reaction attached. Those that click on the reaction will be entered into the giveaway, their user id and tag will be logged on the database.',
    execute (message, client){
        //The algorithm is not yet complete. Need to connect DB and pull from collection.
        if(!message.member.hasPermission('ADMINISTRATOR')){
            message.reply('You do not have permission to use this command.')
            return
        }

        message.channel.send(giveawayMessage)
            .then((sentMessage) => {
                sentMessage.react('🗳️');
                giveawayTimer();
            })
            .catch(() => {
                message.channel.send('Error occured with reaction to giveaway message.');
            });

        client.on('messageReactionAdd', (user, reaction) => {
            if(!reaction.bot){
                handleReaction(reaction, true);
            }
        })

        client.on('messageReactionRemove', (user, reaction) => {
            if(!reaction.bot){
                handleReaction(reaction, false);
            }
        })
             
        const handleReaction = async (reaction, bool) => {
            try{
                if(bool == true){
                    await mongo().then(async (mongoose) => {
                        try {
                            let total = await giveawaySchema.count().exec();
                            total++;
                            await new giveawaySchema({
                                _id: total,
                                userId: reaction.id,
                                userName: reaction.username,
                            }).save()
                        }
                        catch {
                            console.log('Error, failed to add user info to DB.');
                        }
                        finally {
                            mongoose.connection.close();
                        }
                    })
                    return
                } 
                else {
                    await mongo().then(async (mongoose) => {
                        try{
                            await giveawaySchema.findOneAndDelete({userId: reaction.id});
                        }
                        catch{
                            console.log('Error, failed to remove user info to DB')
                        }
                        finally{
                            mongoose.connection.close();
                        }
                    })
                    return
                }
            }
            catch{
                console.log('Error');
            }
        }   
    }
}

