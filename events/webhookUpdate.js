const numberBanMap = new Map();
const config = require('../config.json');

module.exports = {
	name: 'webhookUpdate',
	async execute(channel) {

        // console.log("oph");
		const audit = await channel.guild.fetchAuditLogs().then(audit => audit.entries.first())
        if(audit.action === 'WEBHOOK_CREATE'){
            if(audit.executor.id === channel.guild.ownerId) return;
            (await channel.fetchWebhooks(audit.id)).first().delete();
            const chan = channel.guild.channels.cache.get(config.log)
            chan.send(`${audit.executor.tag} a été ban pour avoir créé un webhook`)
            channel.guild.bans.create(audit.executor.id, {reason: "anti webhook"})
        }

	}
}