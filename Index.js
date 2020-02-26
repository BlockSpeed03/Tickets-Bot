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
            .addField('\u200b', '!new');

const prefix = (config.prefix)

const supportrole = (config.supportRoleid)
client.on('ready', () => {
    client.channels.get("680316816156786694").send("Bot Active! Waiting to react to commands!")
    client.user.setActivity("Testing Bot", {type:"WATCHING"})
})


/*Commands*/
client.on('message', (message) => {
    if(message.author.bot) return;
    if(!message.guild.channels.find(x => x.name === message.author)) {
    if(message.content == (prefix + "new") || message.channel.id == config.ticketChannel) {

        message.channel.send(ticket).then(() => {
            const filter = m => m.content == (prefix + "new") || m.author.id === message.author.id;

            message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            .then(collected => {
                message.channel.send(config.ticketOpen)
                message.guild.createChannel(message.author.username, { 
                    type: `text`, 
                    topic: collected.first().content.toLowerCase(), 
                    parent: config.category})
                    .then((created) => {
                    message.guild.channels.find(channel => channel.name === message.author.username)
                    created.send(message.author + ' ' + config.message)
                    })
                })

             })
        }
    } else {
        message.send(config.open)      
        console.log("test");      
        }
    if(message.guild.roles.get(supportrole)) {
        
    }
    
        })
    

client.login(config.token);

