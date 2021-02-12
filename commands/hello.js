module.exports = {
    name: 'hello',
    description: 'This command returns a "Hello!" from the bot',
    execute(message, args){
        message.channel.send('Hello!');
    }
}