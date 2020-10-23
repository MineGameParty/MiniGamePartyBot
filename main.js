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

//node.js modules
const discord = require("discord.js");
const fs = require('fs');

//class
/*
const banevent = require('./src/ban.js')
const kickevent = require('./src/kick.js')
const detectmsgevent = require('./src/detectmsg.js')*/
const anmevent = require('./src/announce_new_member.js');
//const detect_reaction_rule = require('./src/detect-reaction-rule.js')

//config
let guildData = JSON.parse(fs.readFileSync('./config/guilddata.json','utf8'));
const BOT_DATA = require('./config/setting.json');

//other 
const option = {ws: {intents: discord.Intents.ALL}, restTimeOffset: 10};
const client = new discord.Client(option);
const logger = require('./src/util/logger');
const configChecker = require('./src/util/config');

//start the bot
client.on("ready", message => {
  logger.info(`bot is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}{reset}\n`);
  client.user.setActivity(`MiniGameParty ver. ${BOT_DATA.VERSION}`, { type: 'PLAYING' });
  //client.channels.cache.get(guildData.guild.Channel.Rule).messages.fetch(guildData.guild.Panel.Rule)
});

//guild update event
client.on("guildUpdate", bot =>{
  guildData.guild.GuildName = bot.members.guild.name;
  fs.writeFileSync('./config/setting.json',JSON.stringify(guildData, null, '\t'),'utf8');
  logger.info(`guildCreate catch`);
})

//message event
client.on("message", async message => {
  
  if (message.content.startsWith(BOT_DATA.PREFIX)){
    const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');

    if(command.toLowerCase() === "stop" &&(message.author.id === message.guild.ownerID || message.member.roles.cache.get(guildData.guild.Role.top))){
      logger.info(`server was stoped by {cyan}${message.author.tag}`);
      await message.delete();
      client.destroy();
      process.exit(0)};
    
      //write command code here
      commandHandler.commandHandler([command, ...args],message,guildData,BOT_DATA,client);
  };
  /*

  const bane = new banevent(message,guildData)
  const kicke = new kickevent(message,guildData)
  const detectmsge = new detectmsgevent(message,guildData)

  bane.ban();
  kicke.kick();
  detectmsge.detectmsg();*/
})

client.on("guildMemberUpdate", async (olduser,newuser) =>{
  //announce_new_member.js 'announce new member'
  anmevent.announce_new_member(olduser,newuser,guildData);
})


client.on("messageReactionAdd", async(messageReaction ,user) =>{
  if(user.bot) return;
  //detect-reaction-rule.js 'detect to react the message for our server's rule'
  //detect_reaction_rule(messageReaction ,user, client, guildData);
})    


configChecker.check(BOT_DATA);
let token;
if(process.argv.length>=3){
  switch(process.argv[2]){
    case "main" :
      token = BOT_DATA.MAIN_TOKEN;
      break;
    case "div" :
      configChecker.divCheck(BOT_DATA);
      token = BOT_DATA.DIV_TOKEN;
      BOT_DATA.VERSION = `dev(${BOT_DATA.VERSION})`;
      break;
    default :
      logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
      process.exit(0);
  };
}else token = BOT_DATA.MAIN_TOKEN;
client.login(token);