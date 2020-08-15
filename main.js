/*

created by huda0209
minigamepartybot for discord bot 

main.js :MAIN  'MAIN CODE'  <= this
 -kick.js :CLASS  'kick the member'
 -ban.js :CLASS  'react the message'
 -detectmsg.js :CLASS  'detect to write self introduction and add the role'
 -announce_new_member.js :CLASS  'announce new member'
 -detect-reaction-rule.js :CLASS  'detect to react the message for our server's rule'

ran by node.js and discord.js

ver. 2.1.0
2020-8-15

*/

//node.js modules
const dotenv = require('dotenv').config();
const fs = require('fs');
const discord = require("discord.js");

//class
const banevent = require('./class/ban.js')
const kickevent = require('./class/kick.js')
const detectmsgevent = require('./class/detectmsg.js')
const anmevent = require('./class/announce_new_member.js')
const detectteactionruleevent = require('./class/detect-reaction-rule.js')

//other 
const json = JSON.parse(fs.readFileSync('./setting.json','utf8'));
const client = new discord.Client();
const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


//start the bot
client.on("ready", message => {
  console.log("bot is ready!");
  client.user.setActivity('MiniGamePartyBot Ver 2.1.0', { type: 'PLAYING' })
  client.channels.cache.get(json.guild.Channel.Rule).messages.fetch(json.guild.Panel.Rule)
});

//guild update event
client.on("guildUpdate", bot =>{
  json.guild.GuildName = bot.members.guild.name;
  fs.writeFileSync('./setting.json',JSON.stringify(json),'utf8');
  console.log("guildUpdate catch");
})

//message event
client.on("message", async message => {
  
if(message.content.startsWith("//stop")){
  if(message.author.id === json.guild.Owner || message.member.roles.cache.get(json.guild.Role.top)){
    console.log("server stop");
    await message.delete()
    process.exit(0);}
  }

  const bane = new banevent(message,json)
  const kicke = new kickevent(message,json)
  const detectmsge = new detectmsgevent(message,json)

  bane.ban();
  kicke.kick();
  detectmsge.detectmsg();

})


client.on("guildMemberUpdate", async (olduser,newuser) =>{
  //announce_new_member.js 'announce new member'
  const anme = new anmevent(olduser,newuser,client,fs,letter,json)
  anme.anm()
})


client.on("messageReactionAdd", async(messageReaction ,user) =>{
  if(user.bot) return;
  //detect-reaction-rule.js 'detect to react the message for our server's rule'
  const drre = new detectteactionruleevent(messageReaction ,user,client,fs,letter,json)
  drre.drr()
})    


if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);