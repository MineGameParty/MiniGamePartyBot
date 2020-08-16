/*

created by huda0209
minigamepartybot for discord bot 

main.js :MAIN  'MAIN CODE'
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'ban the member'
 -detectmsg.js :CLASS  'detect to write self introduction and add the role'  <= this
 -announce_new_member :CLASS  'announce new member'
 -detect-reaction-rule.js :CLASS  'detect to react the message for our server's rule'

ran by node.js and discord.js

2020-8-15

*/


class detectmsgevent {
    constructor(message,json) {
        this.message = message;
        this.json = json
    }

    async detectmsg (){
        const message = this.message;
        const json = this.json;

        if(message.channel.id === json.guild.Channel.SelfIntoroduction && !message.member.roles.cache.get(json.guild.Role.member)){
            const member = message.member
            await member.roles.add(json.guild.Role.write)
            if(member.roles.cache.get(json.guild.Role.write) && member.roles.cache.get(json.guild.Role.check)){
                await member.roles.remove(json.guild.Role.write)
                await member.roles.remove(json.guild.Role.check)
                await member.roles.add(json.guild.Role.member)
            }
        }
    }
}

module.exports = detectmsgevent