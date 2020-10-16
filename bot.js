require('dotenv');
const Discord = require('discord.js');
const config = require('./config.json');
const prefix = config.prefix;
const client = new Discord.Client();
const embed = new Discord.MessageEmbed({
    title: 'WERYFIKACJA',
    description: 'Aby odblokować podstawowe uprawnienia użytkownika które pozwolą ci między innymi pisać na kanale #general,\n' +
        'pozostaw reakcje weryfikacji jeśli zapoznałeś się z naszym regulaminem.',

}).setColor('#29db0c');

client.login(config.token).catch(console.error);
client.on('ready', () => {
    console.log('I am ready!');
    client.channels.cache.get('753313118305779839').send(embed).then(sentembed => sentembed.react("✅"));
});
/*client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Witaj ${member}, zaakceptuj regulamin aby kontynuować`);
});*/
client.on('messageReactionAdd', async (reactionReaction, user) => {

    const message = reactionReaction.message;
    const verifyChannel = message.guild.channels.cache.find(c => c.name === 'rules-register');
    const member = message.guild.members.cache.get(user.id);
    if (member.user.bot) return;
    const verify = message.guild.roles.cache.get('761681820735373322');


    if (reactionReaction.emoji.name === '✅' && message.channel.id === verifyChannel.id) {
        member.roles.add(verify).catch(console.error);

    }
});
client.on('messageReactionRemove', async (reactionReaction,user) => {

    const message = reactionReaction.message;
    const member = message.guild.members.cache.get(user.id);
    if (member.user.bot) return;
    const verify = message.guild.roles.cache.get('761681820735373322');
    member.roles.remove(verify).catch(console.error);


});
client.on('message', message => {
    // If the message is "what is my avatar"
    switch (message.content) {
        case prefix+'what is my avatar?': // Send the user's avatar URL
            message.reply(message.author.displayAvatarURL()).catch(console.error);
            break;
        case prefix+'U stupid': //no U
            message.reply('No U.').catch(console.error);
            break;
        case prefix+'D10': // Simulate D10 dice roll
            message.reply(Math.floor((Math.random() * 10) + 1)).catch(console.error);
            break;
        case prefix+'D100': // Simulate D10 dice roll
            message.reply(Math.floor((Math.random() * 100) + 1)).catch(console.error);
            break;
        case prefix+'D20': // Simulate D10 dice roll
            message.reply(Math.floor((Math.random() * 20) + 1)).catch(console.error);
            break;
        case prefix+'clean': //cleans cache
            const amount = client.sweepMessages(2000);
            console.log(`Successfully removed ${amount} messages from the cache.`);
            break;
        case prefix+'sleep': //update presence
            client.user.setStatus('dnd')
                .then(console.log)
                .catch(console.error);
            break;
        case prefix+'wake': //update presence
            client.user.setStatus('online')
                .then(console.log)
                .catch(console.error);
            break;
        case prefix+'ark': //update presence
            client.user.setActivity('ARK: Survival Evolved', {
                type: 'PLAYING'
            })
                .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
                .catch(console.error);
            break;

        case prefix+'help': //dm help
            message.author.send("hello").catch(console.error);
            break;
    }
});