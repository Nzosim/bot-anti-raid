const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed, Message } = require('discord.js');
const config = require('./config.json');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_BANS", "GUILD_MEMBERS", "GUILD_WEBHOOKS", "DIRECT_MESSAGES"] }); 
client.commands = new Collection();
client.login(config.token);


const commandFiles = fs.readdirSync(`./commands`).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Erreur', ephemeral: true });
	}
});
