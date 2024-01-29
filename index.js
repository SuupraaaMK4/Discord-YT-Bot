const Discord = require("discord.js")
const { Client, Intents, Collection } = require("discord.js")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS ] })
const token = ""
const mongoose = require("mongoose")
const mg = ""
const MessageEmbed = require('discord.js')
const fs = require('fs'); 


mongoose.connect(mg, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})








client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));
const funcommands = fs.readdirSync('./comandos/fun').filter(file => file.endsWith('.js'))


for (const file of funcommands) {
    const command = require(`./comandos/fun/${file}`)
    client.commands.set(command.name, command)
}


client.on('ready', async () => {
    

  const array = [ 
        { 
          name: `a/help`,
          type: `WATCHING` 
        }
      ];


  setInterval(() => { 
    function presence() { 
        client.user.setPresence({
          activities: [array[Math.floor(Math.random() * array.length)]],
          status: 'online'
        });
    }

    
    presence(); 
}, 4000); 

  console.log('✔️ | Presencia Cargada Correctamente')

});


client.on('messageCreate', async message => {

    try{
  
  
    let prefix = "a/"
  
  
  
  if (!message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  
  let usuario = message.mentions.users.first() || message.member; 
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const command = args.shift().toLowerCase(); 
  
  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  const embedcmd = new Discord.MessageEmbed()
  .setTitle("Correction")
  .setDescription(`The command **${command}** doesn't exist, please use **${prefix}help** to view the list of commands`)
  .setColor("RED")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  if(!cmd) return message.reply({embeds: [embedcmd]}).then(msg => {
    setTimeout(() => {
       if (!msg.deleted) {
          msg.delete()
          .catch(err => {
             ;
          })
       }
    }, 5000)
  })
       
  

      
  
  
  if (cmd) {
          
              cmd.execute(client, message, args).catch(err => {
                return;
              })
          
      }
      
      
    
  
      
  } catch(e){
    return;
  }
  
  
  
  
  });



client.login(token)