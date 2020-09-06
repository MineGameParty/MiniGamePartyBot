/*

created by huda0209
minigamepartybot for discord bot 

main.js :MAIN  'MAIN CODE'
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'ban the member'
 -detectmsg.js :CLASS  'detect to write self introduction and add the role'
 -announce_new_member :CLASS  'announce new member'  <= this
 -detect-reaction-rule.js :CLASS  'detect to react the message for our server's rule'

ran by node.js and discord.js

2020-8-15

*/


class anmevent {
    constructor(olduser,newuser,json) {
        this.olduser = olduser;
        this.newuser = newuser;
        this.json = json
    }

    async anm (){
        const newuser = this.newuser;
        const olduser = this.olduser;
        const json = this.json;

        if(newuser.roles.cache.get(json.guild.Role.member) && !olduser.roles.cache.get(json.guild.Role.member)){
            var message = json.guild.Message.Welcome
            message = message.replace('{NAME}', `<@${newuser.id}>`)
            message = message.replace('{GUILDNAME}', `<@${newuser.guild.id}>`)
            await newuser.guild.channels.cache.get(json.guild.Channel.Welcome).send(message);
          };
    }
}

module.exports = anmevent