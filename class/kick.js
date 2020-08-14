/*

created by huda0209
minigamepartybot for discord bot 

main.js :MAIN  'MAIN CODE'
 -kick.js :CLASS  'kick the member'  <= this
 -ban.js :CLASS  'ban the member'
 -detectmsg.js :CLASS  'detect to write self introduction and add the role'
 -announce_new_member :CLASS  'announce new member'
 -detect-reaction-rule.js :CLASS  'detect to react the message for our server's rule'

ran by node.js and discord.js

2020-8-14

*/


class kickevent {
    constructor(message,client,fs,letter,json) {
        this.message = message;
        this.client = client;
        this.fs = fs;
        this.letter = letter;
        this.json = json
    }

    async kick (){
        const message = this.message;
        const client = this.client;
        const fs = this.fs;
        const letter = this.letter;
        const json = this.json;


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
                ];}else if (message.content.endsWith("2")){
                    reason = [
                    json.guild.KickReason.order.inside,
                    json.guild.KickReason.order.outside
                ];}else if (message.content.endsWith("3")){
                    reason = [
                    json.guild.KickReason.remark.inside,
                    json.guild.KickReason.remark.outside
                ];}else if (message.content.endsWith("4")){
                    reason = [
                    json.guild.KickReason.direction.inside,
                    json.guild.KickReason.direction.outside
                ];}else if (message.content.endsWith("5")){
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
                        description: `${member.user.tag}をkickしました\nreason : ${reason[0]}"\n執行者 : ${message.member.user.username}`,
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
                            description: "MineGamePartyにご参加いただきありがとうございます。\n\n" +
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
                    await member.kick(reason[0]);

                }catch(e){console.log("kick system error\n"+e);}; 
        };
    }
}

module.exports = kickevent