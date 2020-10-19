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

const punish = require('./command/punish')

const commandHandler = async function ([command, ...args],message,guildData,BOT_DATA,client){

    switch(command.toLowerCase()){
        case "kick" :
            punish.kick();
            break;
        case "ban" :
            punish.ban();
            break;
      }
}

exports.commandHandler = commandHandler