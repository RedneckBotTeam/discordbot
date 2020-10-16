require('dotenv');
const Discord = require('discord.js');
const config = require('./config.json');
const prefix = config.prefix;
const client = new Discord.Client();
var channel = client.channels.get(753310847635292252);
var embed = new Discord.MessageEmbed({
    Color: '#46a832',
    title: 'WERONIKA',
    description: 'Aby odblokować podstawowe uprawnienia użytkownika które pozwolą ci między innymi pisać na kanale #general,\n' +
        'pozostaw reakcje weryfikacji jeśli zapoznałeś się z naszym regulaminem.',

});

client.login(config.token).then(
    channel.send(embed));
client.on('ready', () => {
    console.log('I am ready!');
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
    const verifyChannel = message.guild.channels.cache.find(c => c.name === 'rules-register');
    const member = message.guild.members.cache.get(user.id);
    if (member.user.bot) return;
    const verify = message.guild.roles.cache.get('761681820735373322');
    member.roles.remove(verify).catch(console.error);


});
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
        case prefix+'clean': //cleans cache
            const amount = client.sweepMessages(2000);
            console.log(`Successfully removed ${amount} messages from the cache.`);
            break;
        case prefix+'verify': //accept rules
            var member = message.member;
            member.roles.add('761681820735373322').catch(console.error);
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
            message.author.send("hello");
            break;
		case 'Aby zweryfikować kliknij ✅': //react to message
			message.react("✅");
			break;
    }
});
