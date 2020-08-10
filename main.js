/*

created by huda0209
minigameparty for discord bot 

ran by node.js and discord.js

2020-8-8
*/


const dotenv = require('dotenv').config();
const fs = require('fs');
const discord = require("discord.js");
const { send } = require('process');


const json = JSON.parse(fs.readFileSync('./setting.json','utf8'));
const client = new discord.Client();

var letter = [":zero:",":one:",":two:",":three:",":four:",":five:",":six:",":seven:",":eight:",":nine:",":keycap_ten:",":regional_indicator_a:",":regional_indicator_b:",":regional_indicator_c:",":regional_indicator_d:",":regional_indicator_e:",":regional_indicator_f:",":regional_indicator_g:",":regional_indicator_h:",":regional_indicator_i:",":regional_indicator_j:",":regional_indicator_k:",":regional_indicator_l:",":regional_indicator_m:",":regional_indicator_n:",":regional_indicator_o:",":regional_indicator_p:",":regional_indicator_q:",":regional_indicator_r:",":regional_indicator_s:",":regional_indicator_t:",":regional_indicator_u:",":regional_indicator_v:",":regional_indicator_w:",":regional_indicator_x:",":regional_indicator_y:",":regional_indicator_z:"]
var sign = ["0⃣","1⃣","2⃣","3⃣","4⃣","5⃣","6⃣","7⃣","8⃣","9⃣","🔟","🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹","🇺","🇻","🇼","🇽","🇾","🇿"]



client.on("ready", message => {
  console.log("bot is ready!");
    //client.user.setActivity('', { type: 'PLAYING' })
  });



client.on("guildUpdate", bot =>{
    json.guild.GuildName = bot.members.guild.name;
      
    fs.writeFileSync('./setting.json',JSON.stringify(json),'utf8');
    console.log("guildUpdate catch");
    })


client.on("message", async message => {
  
  if(message.content.startsWith("//stop")){
    if(message.author.id === json.guild.Owner || message.member.roles.cache.get(json.guild.Role.top)){
    console.log("server stop");
    await message.delete()
    process.exit(0);}
    }


  //kick system
  if (message.content.startsWith("//kick")) {
    if (!(message.channel.id === json.guild.Channel.BotPanel))  return message.delete();
      if (!(message.author.id === json.guild.Owner || message.member.roles.cache.get(json.guild.Role.admin) || message.member.roles.cache.get(json.guild.Role.top)))
        return await message.guild.channels.cache.get(json.guild.Channel.BotPanel).send({
                  embed: {
                      title: "実行する権限がありません。",
                      color: json.guild.Color.failed,
                      "footer": {
                            "text": json.guild.Bot.Name,
                            "icon_url": json.guild.Bot.Icon},
                      timestamp: new Date()
                  }
               });
          if (message.mentions.members.size !== 1)
            return await message.guild.channels.cache.get(json.guild.Channel.BotPanel).send({
                      embed: {
                          title: "kickするメンバーを1人指定してください",
                          color: json.guild.Color.failed,
                          "footer": {
                                "text": json.guild.Bot.Name,
                                "icon_url": json.guild.Bot.Icon},
                          timestamp: new Date()
                      }
                   });

          var reason;
              if (message.content.endsWith("1")){
                reason = [
                  json.guild.KickReason.NoSelfIntoroduction.inside,
                  json.guild.KickReason.NoSelfIntoroduction.outside
                ];}
              else if (message.content.endsWith("2")){
                reason = [
                  json.guild.KickReason.order.inside,
                  json.guild.KickReason.order.outside
                ];
              }
              else if (message.content.endsWith("3")){
                reason = [
                  json.guild.KickReason.remark.inside,
                  json.guild.KickReason.remark.outside
                ];
              }else if (message.content.endsWith("4")){
                reason = [
                  json.guild.KickReason.direction.inside,
                  json.guild.KickReason.direction.outside
                ];
              }else if (message.content.endsWith("5")){
                reason = [
                  json.guild.KickReason.other.inside,
                  json.guild.KickReason.other.outside
                ];
              }else return await message.guild.channels.cache.get(json.guild.Channel.BotPanel).send({
                                 embed: {
                                     title: "正しい理由選択番号を入力してください。",
                                     color: json.guild.Color.failed,
                                     footer: {
                                           "text": json.guild.Bot.Name,
                                           "icon_url": json.guild.Bot.Icon},
                                     timestamp: new Date()
                                 }
                               });
        const member = message.mentions.members.first();
        const text ={
            embed: {
              author: {
                name: member.user.username,
                icon_url: member.user.avatarURL()
              },
              title: "Kicked User",
              description:
                `${member.user.tag}をkickしました\nreason : ${reason[0]}"\n執行者 : ${message.member.user.username}`,
              color: json.guild.Color.kick,
              footer: {
                    text: json.guild.Bot.Name,
                    icon_url: json.guild.Bot.Icon},
              timestamp: new Date()
            }
          };
    
        try{
          member.send({
            embed: {
              title: "kickされました。",
              description:
                "MineGamePartyにご参加いただきありがとうございます。\n\n" +
                reason[1] +
                "\n\n再度参加を希望される場合は、公式Twitterなどにあります、招待リンクからお入りください。\nMiniGame Party  運営一同 ",
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
          member.kick(reason[0]);
          
          }catch(e){console.log("kick system error\n"+e);}; 
        };

  
  //ban system
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
              json.guild.Ban.Reason.order.inside,
              json.guild.Ban.Reason.order.outside
            ];
          }
          else if (message.content.endsWith("2")){
            reason = [
              json.guild.Ban.Reason.remark.inside,
              json.guild.Ban.Reason.remark.outside
            ];
          }else if (message.content.endsWith("3")){
            reason = [
              json.guild.Ban.Reason.direction.inside,
              json.guild.Ban.Reason.direction.outside
            ];
          }else if (message.content.endsWith("4")){
            reason = [
              json.guild.Ban.Reason.other.inside,
              json.guild.Ban.Reason.other.outside
            ];
          }else return message.guild.channels.cache.get(json.guild.Channel.BotPanel).send({
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
            member.ban(reason[0]);
          }catch(e){console.log("ban system error\n"+e)}
        };
    })


client.on("guildMemberUpdate", async (olduser,newuser) =>{
    if(newuser.roles.cache.get(json.guild.Role.member) && !olduser.roles.cache.get(json.guild.Role.member)){
      var message = json.guild.Message.Welcome
      message = message.replace('{NAME}', `<@${newuser.id}>`)
      message = message.replace('{GUILDNAME}', `<@${newuser.guild.id}>`)

      await newuser.guild.channels.cache.get(json.guild.Channel.Welcome).send(message);
    };
  })



if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);