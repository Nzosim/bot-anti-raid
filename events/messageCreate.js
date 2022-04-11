const AntiSpam = require("discord-anti-spam")

const antiSpam = new AntiSpam({
    warnThreshold: 3,
    banThreshold: 5, 
    maxInterval: 3000, 
    warnMessage: "{@user}, Stop !", 
    banMessage: "a été banni pour spam",
    maxDuplicatesWarning: 3,
    ignoredPermissions: ["ADMINISTRATOR"],
    unMuteTime:  1440,
    ignoreBots: true, // 
    verbose: true, 
    removeMessages: true, 
    modLogsEnabled: true,
    modLogsChannelName: "log-messages",
    modLogsMode: "embed",
})

module.exports = {
    name: 'messageCreate',
async execute(message) {

            if(message.author.bot) return
            antiSpam.message(message)

    }
}