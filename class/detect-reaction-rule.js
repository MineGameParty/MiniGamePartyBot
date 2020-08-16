/*

created by huda0209
minigamepartybot for discord bot 

main.js :MAIN  'MAIN CODE'
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'react the message'
 -detectmsg.js :CLASS  'detect to write self introduction and add the role'
 -announce_new_member :CLASS  'announce new member'
 -detect-reaction-rule.js :CLASS  'detect to react the message for our server's rule'  <= this

ran by node.js and discord.js

2020-8-15

*/


class detectteactionruleevent {
    constructor(messageReaction ,user, client, json) {
        this.messageReaction = messageReaction;
        this.user = user;
        this.client = client;
        this.json = json
    }

    async drr (){
        const messageReaction = this.messageReaction;
        const user = this.user;
        const client = this.client;
        const json = this.json;


        const member = client.guilds.cache.get(json.guild.GuildId).members.cache.get(user.id);
        if((messageReaction.message.id === json.guild.Panel.Rule) && messageReaction.emoji.name === '👌' && !member.roles.cache.get(json.guild.Role.member)){
            await member.roles.add(json.guild.Role.check)
            if(member.roles.cache.get(json.guild.Role.write) && member.roles.cache.get(json.guild.Role.check)){
                await member.roles.remove(json.guild.Role.write);
                await member.roles.remove(json.guild.Role.check);
                await member.roles.add(json.guild.Role.member);
            }
        }
    }
}

module.exports = detectteactionruleevent