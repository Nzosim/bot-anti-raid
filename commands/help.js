const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../config.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('aide sur les commandes'),
  async execute(interaction) {

    const embed = new MessageEmbed()
        .setTitle('Help')
        .setColor(config.embedColor)
        .setDescription('Voici la liste des commandes disponibles :\n\n`/lock` : lock un channel\n`/unlock` : unlock un channel\n'
            +'`/anti-raid [yes or no]` : active ou desactive l\'anti-raid')

    interaction.reply({ embeds: [embed]})
  },
}