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


class banevent {
    constructor(message,json) {
        this.message = message;
        this.json = json
    }

    async ban (){
        const message = this.message;
        const json = this.json;


        if (message.content.startsWith("//ban")) {

            if (!(message.channel.id === json.guild.Channel.BotPanel))  return message.delete();

              if (!(message.author.id === json.guild.Owner || message.member.roles.cache.get(json.guild.Role.admin) || message.member.roles.cache.get(json.guild.Role.top)))
                return await message.guild.channels.cache.get(json.guild.Channel.BotPanel).send({
                          embed: {
                            title: "実行する権限がありません。",
                            color: json.guild.Color.failed,
                            footer: {
                                  text: json.guild.Bot.Name,
                                  icon_url: json.guild.Bot.Icon},
                            timestamp: new Date()
                          }
                        });

                  if (message.mentions.members.size !== 1)
                    return await message.guild.channels.cache.get(json.guild.Channel.BotPanel).send({
                              embed: {
                                title: "banするメンバーを1人指定してください",
                                color: json.guild.Color.failed,
                                footer: {
                                      text: json.guild.Bot.Name,
                                      icon_url: json.guild.Bot.Icon},
                                timestamp: new Date()
                              }
                           });
        
                  var reason;
                  if (message.content.endsWith("1")){
                    reason = [
                      json.guild.BanReason.order.inside,
                      json.guild.BanReason.order.outside
                    ];
                  }
                  else if (message.content.endsWith("2")){
                    reason = [
                      json.guild.BanReason.remark.inside,
                      json.guild.BanReason.remark.outside
                    ];
                  }else if (message.content.endsWith("3")){
                    reason = [
                      json.guild.BanReason.direction.inside,
                      json.guild.BanReason.direction.outside
                    ];
                  }else if (message.content.endsWith("4")){
                    reason = [
                      json.guild.BanReason.other.inside,
                      json.guild.BanReason.other.outside
                    ];
                  }else return await message.guild.channels.cache.get(json.guild.Channel.BotPanel).send({
                                         embed: {
                                             title: "正しい理由選択番号を入力してください。",
                                             color: json.guild.Color.failed,
                                             footer: {
                                                   text: json.guild.Bot.Name,
                                                   icon_url: json.guild.Bot.Icon},
                                             timestamp: new Date()
                                         }
                                       });
            
                  const member = message.mentions.members.first();
                  const text = {
                            embed: {
                              author: {
                                name: member.user.username,
                                icon_url: member.user.avatarURL()
                              },
                              title: "Banned User",
                              description:
                                `${member.user.tag}をbanしました\nreason : ${reason[0]}\n執行者 : ${message.member.user.username}`,
                              color: json.guild.Color.ban,
                              footer: {
                                    text: json.guild.Bot.Name,
                                    icon_url: json.guild.Bot.Icon},
                              timestamp: new Date()
                            }
                          };
            
                  try{
                    message.mentions.members.first().send({
                      embed: {
                        title: "Banされました。",
                        description:
                          "MineGamePartyにご参加いただきありがとうございます。\n\n" +
                          reason[1] +
                          "\n\nBanの解除等の申請はできません。運営が独自で判断します。\nMiniGame Party  運営一同 ",
                        color: json.guild.Color.info,
                        footer: {
                              text: json.guild.Bot.Name,
                              icon_url: json.guild.Bot.Icon},
                        timestamp: new Date(),
                        thumbnail: {
                          url: json.guild.Bot.Icon
                        }
                      }
                    });
                    
                    await message.channel.send(text);
                    await message.guild.channels.cache.get(json.guild.Channel.Log).send(text);
                    await member.ban(reason[0]);
                  }catch(e){console.log("ban system error\n"+e)}
                };
}}

module.exports = banevent