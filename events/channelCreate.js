module.exports = {
	name: 'channelCreate',
	async execute(channel) {

        const audit = await channel.guild.fetchAuditLogs().then(audit => audit.entries.first());
        if(audit.action === 'CHANNEL_CREATE'){
            if(audit.executor.id === channel.guild.ownerId) return
            channel.delete();
        }

	}
}
