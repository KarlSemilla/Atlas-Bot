//Giveaway module that takes the user's Discord ID and puts it into the Database for a giveaway.
const giveaway = require('../handlers/giveaway.js')
 
module.exports = {
    name: 'giveaway',
    description: 'This function will check if the message is "!giveaway", which will then proceed to add the user\'s tag(name.####)to a the giveaway table located on MongoDB.',
    execute(message, args){
        //The algorithm is not yet complete. Need to connect DB and pull from collection.
        message.reply(message.author.tag);
    }
}