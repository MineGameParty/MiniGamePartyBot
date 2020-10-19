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

const announce_new_member = async function(olduser,newuser,guldData){
    if(newuser.roles.cache.get(guldData.guild.Role.member) && !olduser.roles.cache.get(guldData.guild.Role.member)){
        let message = guldData.guild.Message.Welcome;
        message = message.replace(/{NAME}/g, `<@${newuser.id}>`);
        message = message.replace(/{GUILDNAME}/g, `<@${newuser.guild.id}>`);
        await newuser.guild.channels.cache.get(guldData.guild.Channel.Welcome).send(message);
    };
}

exports.announce_new_member = announce_new_member