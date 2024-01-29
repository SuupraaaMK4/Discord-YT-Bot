const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Client, Intents, Collection } = require("discord.js");
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]});
const userModel = require("../../models/kissSchema");
const gifs = require("../../gifs/gifs.js");



module.exports = {
    name: "kiss", 
    alias: ["besar"], 
    description: "Kiss someone.",
  
  async execute (client, message, args){
  
  
  
  
  
    let mention = message.mentions.users.first()
  
    if(!mention){
      return message.reply(":x: | Debes mencionar a un usuario")
    }
  
    let author = message.author.id
  
    let besado = mention.id
  
    let users = `${author}+${besado}`
    let users2 = `${besado}+${author}`
  
  
    results1 = await userModel.findOne({usersID: users});
    results2 = await userModel.findOne({usersID: users2});
    
    
    if(results1){
  
      let results3 = await userModel.findOne({usersID: users});
  
      let contador1 = results3.kissCount + 1
  
      const update = { kissCount: contador1 }
  
      await results3.updateOne(update)
  
      let results6 = await userModel.findOne({usersID: users});
  
      let besos = results6.kissCount
  
  
      let embed = new Discord.MessageEmbed()
  
      .setDescription(`**${message.author.username}** ha besado ${besos} veces a **${mention.username}**`)
      .setImage(gifs.kiss[Math.floor(Math.random() * gifs.kiss.length)])
      .setColor("RANDOM")
      .setFooter(`Kyrie Bot`)
      .setTimestamp()
  
      message.reply({embeds: [embed]})
      
  
    } else if(results2){
  
      let results3 = await userModel.findOne({usersID: users2});
  
      let contador1 = results3.kissCount + 1
  
      const update = { kissCount: contador1 }
  
      await results3.updateOne(update)
  
      let results6 = await userModel.findOne({usersID: users2});
  
      let besos = results6.kissCount
  
  
  
   
      let embed = new Discord.MessageEmbed()
  
      .setDescription(`**${message.author.username}** ha besado ${besos} veces a **${mention.username}**`)
      .setImage(gifs.kiss[Math.floor(Math.random() * gifs.kiss.length)])
      .setColor("RANDOM")
      .setFooter(`Kyrie Bot`)
      .setTimestamp()
  
      message.reply({embeds: [embed]})
      
  
    }  else {
  
      let user = await userModel.create({
        usersID: users,
        kissCount: 1
      })
      user.save();
  
  
      let embed = new Discord.MessageEmbed()
  
      .setDescription(`**${message.author.username}** ha besado 1 vez a **${mention.username}**`)
      .setImage(gifs.kiss[Math.floor(Math.random() * gifs.kiss.length)])
      .setColor("RANDOM")
      .setFooter(`Kyrie Bot`)
      .setTimestamp()
  
      message.reply({embeds: [embed]})
  
  
    }
  
    
      
  
    
    
  }
  }