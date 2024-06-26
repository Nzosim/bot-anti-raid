const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('Discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('locks a channel'),
    async execute(interaction){

        if(!interaction.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("Vous n'avez pas la permission pour effectuer cette commande !")
    
        await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { 
            SEND_MESSAGES: false 
        })

        return interaction.reply({ content: `channel locked`});

    }
}
