const config = require('./config.json')

const Discord = require('discord.js')

const client = new Discord.Client();


const ticket = new Discord.MessageEmbed()
            .setTitle('Open A Ticket')
            .setColor('#b53235')
            .setDescription('Please Tell Us The Problem You Are Having!');

const help = new Discord.MessageEmbed()
            .setTitle('Ticket Commands')
            .setColor('#b53235')
            .setDescription('List of commands')
            .addFields(
                { name: '\u200b', value: '!new', inline: false }
                );

const prefix = (config.prefix)

const supportrole = (config.supportRoleid)
client.on('ready', () => {
    client.channels.cache.get("682650628626972738").send("Bot Active! Waiting to react to commands!")
    client.user.setActivity("Testing Bot", {type:"WATCHING"})
})


/*Commands*/
client.on('message', (message) => {
    if(message.author.bot) return;
    if(!message.guild.channels.cache.find(x => x.name === message.author)) {   
    if(message.content == (prefix + "new") || message.channel.id == config.ticketChannel) {

        message.channel.send(ticket).then(() => {
            const filter = m => m.content == (prefix + "new") || m.author.id === message.author.id;
            message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            .then(collected => {
                message.channel.send(config.ticketOpen)
                
                message.guild.channels.create(message.author.username, { 
                    type: `text`, 
                    topic: collected.first().content.toLowerCase(), 
                    parent: config.category,
                    permissionOverwrites: [
                        {
                            id: message.author.id,
                            allow: ['VIEW_CHANNEL'],
                            },
                            {
                            id: `680280545456029910`,
                            deny: ['VIEW_CHANNEL'],
                        }
                    ]})
                    .then((created) => {
                    message.guild.channels.cache.find(channel => channel.name === message.author.username)
                    created.send(message.author.username + ' ' + config.message)
                    })
                })

             })
        }
        if(message.content == (prefix + "close") || !message.author.roleid(config.supportRoleid)) return; {
            const filter2 = m => m.content == (prefix + "close") || m.author.id === message.author.id;

            message.channel.awaitMessages(filter2, { max: 1, time: 5000})
            .then(collected => {
                message.channel.send("Are you sure you would like to close this ticket?")
            
                
                const filter3 = m => m.content == (prefix + "confirm") || m.author.id === message.author.id;
            message.channel.awaitMessages(filter3, { max: 1, time: 5000}) 
            .then(collected => {
                message.channel.delete()
            })
        })
    } 
            
} else { 
    message.send(config.open)
}
    
if(message.roleid === config.supportRoleid || message.category === config.awaitingID) {
    messgae.channel.send("Found support role!")
}

})

client.login(config.token);

