const numberBanMap = new Map();
const config = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
        
        if(member.user.bot) member.ban({reason: 'Anti-Bot actifs'})

	}
}