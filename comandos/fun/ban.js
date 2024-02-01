const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]});

module.exports = {
    name: "ban",
    alias: ["banear", "vetar"],



     execute (client, message, args) {


        // Definiciones
        let mencionado = message.mentions.members.first();
        let autor = message.author;
        let razon = args.slice(1).join(' ')


        // Condiciones
        if(message.mentions.users.first() === client.user) return message.reply("No puedes banearme a mi!");

        if(mencionado === autor) return message.reply("No puedes banearte a ti mismo");

        if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("No tengo suficientes permisos");

        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("No tienes permisos para banear usuarios!");

        if(!mencionado) return message.reply("Debes de mencionar a un usuario");

        if(message.member.roles.highest.comparePositionTo(message.mentions.members.first().roles.highest) <= 0) return message.reply('No puedes banear a un usuario con un rol igual o mayor al tuyo');

        if(mencionado.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) return message.reply("No puedo banear a un usuario con un rol igual o superior al mio!");
        
        if(!razon){
            razon = 'Sin especificar'
        }


        // Código

        mencionado.ban({reason: razon}).catch(e => {
            console.log(e)
        })

        const embed = new Discord.MessageEmbed()

        .setTitle('Usuario Baneado!')
        .setDescription(`El usuario **${mencionado}** fue baneado del servidor!`)
        .addField("Moderador:", `${autor}`)
        .addField("Razón:", `${razon}`)
        .setColor("RED")

        message.reply({ embeds: [embed] })


    }

}