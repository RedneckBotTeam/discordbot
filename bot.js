
var Discord = require('discord.io');
var logger = require('winston');
// Bot Reads auth.json file to get token
const dotenv = require('dotenv');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'all';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: process.env.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `*`
    if (message.substring(0, 1) == '*') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            // Welcome command I guess?
            case 'mornin':
                bot.sendMessage({
                    to: channelID,
                    message: 'Gut mornin'
                });
                break;
            // Simulate D10 dice roll
            case 'D10':
                bot.sendMessage({
                    to: channelID,
                    message: Math.floor((Math.random() * 10) + 1)
                });
                break;
            // Simulate D6 dice roll.
            case 'D6':
                bot.sendMessage({
                    to: channelID,
                    message: Math.floor((Math.random() * 6) + 1)
                });
                break;
            // Simulate D100 dice roll.
            case 'D100':
                bot.sendMessage({
                    to: channelID,
                    message: Math.floor((Math.random() * 100) + 1)
                });
                break;
           /* case 'test':
                bot.addToRole({
                    userID: 516201569838956552,
                    roleID: 738737631780667453,
                });
                break;*/
            // Just annoying ping
            case 'hey':
                bot.sendMessage({
                    to: channelID,
                    message: "<@&707333518581039105> SHOTO!!!!!",
                    embed: {
                        color: 16777215, description: 'SHOTO',
                        image: {
                            url: "https://pm1.narvii.com/6868/30daee370422836236b911a3fda8f7af47db1230r1-1920-1080v2_uhq.jpg"
                        }
                    }
                });
                break;


        }
    }
});
