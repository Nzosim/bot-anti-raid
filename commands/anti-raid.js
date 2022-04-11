const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('Discord.js')
const fs = require('fs')
const db = require('../antiRaid.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('antiraid')
        .setDescription('active ou desactive l anti-raid channel')
        .addStringOption(option => option.setName('active').setDescription('on ou off').setRequired(true)),
    async execute(interaction){

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")
    
        let yn = interaction.options.getString('active')

        if(yn == "on"){
            db.antiRaid = "on"
            fs.writeFileSync('./antiRaid.json', JSON.stringify(db))
            interaction.reply({ content: `anti raid activé`, ephemeral: true });
        }else if(yn == "off"){
            db.antiRaid = "off"
            fs.writeFileSync('./antiRaid.json', JSON.stringify(db))
            interaction.reply({ content: `anti raid désactivé`, ephemeral: true });
        }else{
            interaction.reply({ content: `veuillez indiquer on ou off`, ephemeral: true });
        }

    }
}