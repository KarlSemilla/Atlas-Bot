//Added a coin-toss module from https://www.npmjs.com/package/coin-toss
const coin = require('coin-toss');


module.exports = {
    name: 'flip',
    description: 'This command flips a coin and decides whether the outcome will be "Heads" or "Tails"',
    execute(message, args){
        message.reply("🪙 " + coin.toss());
    }
}