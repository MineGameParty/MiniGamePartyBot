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

const { commandHandler } = require('../command-handler');
const logger = require('../util/logger');


const permCheck = async function(message,guildData,commnad){
    let permissionName
    switch (command.toLowerCase()) {
        case "kick":
            permissionName = "KICK_MEMBERS";
            break;
        case "ban":
            permissionName = "BAN_MEMBERS";
            break;
        default:
            return false;
    };

    if (!message.member.permissions.has(permissionName)){
        await message.guild.channels.cache.get(guildData.guild.Channel.BotPanel).send({
              embed: {
                title: "実行する権限がありません。",
                color: guildData.guild.Color.failed,
                footer: {
                      text: guildData.guild.Bot.Name,
                      icon_url: guildData.guild.Bot.Icon},
                timestamp: new Date()
              }
        });
        return false;
    }else return true;
};

const memberCount = async function(message,guildData){
    if (message.mentions.members.size !== 1){
        await message.guild.channels.cache.get(guildData.guild.Channel.BotPanel).send({
              embed: {
                title: "メンバーを1人指定してください",
                color: guildData.guild.Color.failed,
                footer: {
                      text: guildData.guild.Bot.Name,
                      icon_url: guildData.guild.Bot.Icon},
                timestamp: new Date()
              }
           });
        return false;
    }else return true;
};

const reasonSelect = function(){



};

const kick = async function(){



};

const ban = async function(){



};

exports.kick = kick;
exports.ban = ban;