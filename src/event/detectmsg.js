/*

created by huda0209
minigamepartybot for discord bot 

main.js :MAIN  'MAIN CODE'  <= this
  -kick.js :module
  -ban.js :module
  -command-handler.js :module
  -punish.js :module
  -detectmsg.js :module
  -announce_new_member.js :module
  -detect-reaction-rule.js :module

ran by node.js and discord.js

2020-10-19
*/

const detectMsg = async function(message,guildData){

    if(message.channel.id === guildData.guild.Channel.SelfIntoroduction && !message.member.roles.cache.get(guildData.guild.Role.member)){
        const member = message.member;
        await member.roles.add(guildData.guild.Role.write);
        await member.roles.add(guildData.guild.Role.check);

        if(member.roles.cache.get(guildData.guild.Role.write) && member.roles.cache.get(guildData.guild.Role.check)){;
            await member.roles.remove(guildData.guild.Role.write);
            await member.roles.remove(guildData.guild.Role.check);
            await member.roles.add(guildData.guild.Role.member);
        };
    };
};


exports.detectmsg = detectMsg;