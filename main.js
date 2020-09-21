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

2020-9-21
*/

//node.js modules
const dotenv = require('dotenv').config();
const discord = require("discord.js");

//class
const banevent = require('./src/ban.js')
const kickevent = require('./src/kick.js')
const detectmsgevent = require('./src/detectmsg.js')
const anmevent = require('./src/announce_new_member.js')
//const detectteactionruleevent = require('./src/detect-reaction-rule.js')

//other 
var json = JSON.parse(fs.readFileSync('./config/guilddata.json','utf8'));
const BOT_DATA = require('./config/setting.json');
const client = new discord.Client();
const package = require('./package.json');
const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


//start the bot
client.on("ready", message => {
  console.log(`bot is ready! ver. ${package.version} \nlogin: ${client.user.tag}`);
  client.user.setActivity(`MiniGamePartyBot ver. ${package.version}`, { type: 'PLAYING' })
  //client.channels.cache.get(json.guild.Channel.Rule).messages.fetch(json.guild.Panel.Rule)
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
  const anme = new anmevent(olduser,newuser,json)
  anme.anm()
})


client.on("messageReactionAdd", async(messageReaction ,user) =>{
  if(user.bot) return;
  //detect-reaction-rule.js 'detect to react the message for our server's rule'
  /*const drre = new detectteactionruleevent(messageReaction ,user, client, json)
  drre.drr()*/
})    


if(BOT_DATA.bot.MAIN_TOKEN == undefined || BOT_DATA.bot.MAIN_TOKEN == ""){
  console.log("please set ENV : MAIN_TOKEN");
  process.exit(0);
};

var token;
if(process.argv.length>=3){
  switch(process.argv[2]){
    case "main" :
      token = BOT_DATA.bot.MAIN_TOKEN;
      break;
    case "test" :
      if(BOT_DATA.bot.TEST_TOKEN == undefined || BOT_DATA.bot.TEST_TOKEN == ""){
        console.log("please set ENV : TEST_TOKEN");
        process.exit(0);
      };
      token = BOT_DATA.bot.TEST_TOKEN;
      package.version = `dev(${package.version})`
      break;
    default :
      console.log(`\nUnknown command. \nUsage \n node main.js main : Use main token \n node main.js test : Use test token`)
      process.exit(0);
  };
}else token = BOT_DATA.bot.MAIN_TOKEN
client.login(token);