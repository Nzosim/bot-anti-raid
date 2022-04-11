const numberBanMap = new Map();
const config = require('../config.json');

module.exports = {
	name: 'guildBanAdd',
	async execute(member, guild) {

		const audit = await member.guild.fetchAuditLogs().then(audit => audit.entries.first());

		if(audit.executor.bot) return;

		
		if(audit.action === 'MEMBER_BAN_ADD'){
			if(audit.executor.id === member.guild.ownerId) return;
				if(numberBanMap.has(audit.executor.id)){
					const userData = numberBanMap.get(audit.executor.id);
					let {nBan} = userData;
					nBan += 1;
					userData.nBan=nBan;
					numberBanMap.set(audit.executor.id, userData);
					if(nBan === 5){
						const chan = member.guild.channels.cache.get(config.log);
						chan.send(`${audit.executor.tag} a été ban pour avoir ban 5 personnes`)
						member.guild.bans.create(audit.executor.id, {reason: "anti ban"})
					}
				}
				else {
					numberBanMap.set(audit.executor.id, {
						nBan: 1
					});
					setTimeout(() => {
						numberBanMap.delete(audit.executor.id);
					},10000)
				}
		}
	}
}