const numberBanMap = new Map();
const db = require('../antiRaid.json');
const { Captcha } = require('captcha-canvas');
const { writeFileSync } = require('fs');
const captcha = new Captcha();
captcha.async = true 
captcha.addDecoy(); 
captcha.drawTrace(); 
captcha.drawCaptcha();
const { MessageAttachment } = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
        
        if(member.user.bot) member.ban({reason: 'Anti-Bot actifs'})

		if(db.antiRaid == "on"){
			member.ban({reason: 'Anti-Raid actifs'})
		}

		const ca = new MessageAttachment(
			await captcha.png,
			"captcha.png"
		)

		const msg = member.send({files: [ca], content: "Veuillez completer le captcha pour accéder au serveur"})
		const filter = message => {
			if(message.author.id !== member.id) return
			if(message.content === captcha.text) return true
			else member.send("Captcha incorrect")
		}

		try{
			const reponse = await msg.channel.awaitMessages({
				filter,
				max: 1,
				time: 10000,
				errors: ['time']
			})

			if(reponse){
				member.send("Bienvenue sur le serveur")
				member.roles.add(config.memberRole)
			}
		} catch(err) {
			member.send("Captcha non validé")
			member.kick("Captcha non validé")
		}
	}
}