const config = require('../config.json')

module.exports = {
	name: 'channelDelete',
	async execute(channel) {


        const audit = await channel.guild.fetchAuditLogs().then(audit => audit.entries.first())
        if(audit.action === 'CHANNEL_DELETE'){
            if(audit.executor.id === channel.guild.ownerId || audit.executor.id == config.clientId) return;
            const chan = channel.guild.channels.cache.get(config.log)
            chan.send(`${audit.executor.tag} a été ban pour avoir supprimé un channel`)
            channel.guild.bans.create(audit.executor.id, {reason: "anti delete channel"})
        }

	}
}
