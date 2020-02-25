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

client.on('ready', () => {
    client.channels.get("680316816156786694").send("Bot Active! Waiting to react to commands!")
    client.user.setActivity("Testing Bot", {type:"WATCHING"})
})


/*Commands*/
client.on('message', (message) => {
    if(message.content.includes('!new')) {
        message.channel.send(ticket)
        const filter = m => m.content.includes('!new') || m.author.id === message.author.i;
        const collector = message.channel.createMessageCollector(filter, { max: 1, time: 10000 });

        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
        });

        collector.on('end', collected => {
            message.guild.createChannel(`${message.author.username}` + `${ collected}`, "text")
            console.log(`Collected ${collected.size} items`)
        });
        }
        
    
    if(message.content == '!help') {
        message.channel.send(help)
    }
});


client.login(config.token);

