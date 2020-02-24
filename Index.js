const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client();
const ticket = new Discord.RichEmbed()
            .setTitle('Open A Ticket')
            .setColor('#b53235')
            .setDescription('Please Tell Us The Problem You Are Having!');

const help = new Discord.RichEmbed()
            .setTitle('Ticket Commands')
            .setColor('#b53235')
            .setDescription('List of commands')
            .addField('!new');

const prefix = (config.prefix)

client.on('ready', () => {
    client.channels.get("680316816156786694").send("Bot Active! Waiting to react to commands!")
    client.user.setActivity("Testing Bot", {type:"WATCHING"})
})

client.on('message', (message) => {
    if(message.content == '!new') {
        message.channel.send(ticket)
        }
    
    if(message.content == '!help') {
        message.channel.send(help)
    }
});


client.login(config.token);

