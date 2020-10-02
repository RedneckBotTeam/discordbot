require('dotenv');
const Discord = require('discord.js');
const config = require('./config.json');
const prefix = config.prefix;
const client = new Discord.Client();

client.login(config.token);
client.on('ready', () => {
    console.log('I am ready!');
});
/*client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Witaj ${member}, zaakceptuj regulamin aby kontynuować`);
});*/
client.on('message', message => {
    // If the message is "what is my avatar"
    switch (message.content) {
        case prefix+'what is my avatar?': // Send the user's avatar URL
            message.reply(message.author.displayAvatarURL());
            break;
        case prefix+'U stupid': //no U
            message.reply('No U.');
            break;
        case prefix+'D10': // Simulate D10 dice roll
            message.reply(Math.floor((Math.random() * 10) + 1));
            break;
        case prefix+'D100': // Simulate D10 dice roll
            message.reply(Math.floor((Math.random() * 100) + 1));
            break;
        case prefix+'D20': // Simulate D10 dice roll
            message.reply(Math.floor((Math.random() * 20) + 1));
            break;
        case prefix+'weryfikacja':
            // Send a basic message
            channel.send('Aby zweryfikować kliknij ✅')
                .catch(console.error);
            message.react('✅');
            break;
    }
});
