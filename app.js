//Calling Discord.js Package
const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')


//Listener Event: Message Received
bot.on('message', message =>  {

  //Variables
  var sender = message.author;
  var msg = message.content.toUpperCase();
  var prefix = ">"

  //Ping Pong
  if (msg === prefix + 'Ping')
  {
    message.channel.send('Pong!')
  }
});

bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  if bot.guilds.size > 1
  {
    bot.user.setActivity(`Serving ${bot.guilds.size} Guilds`);
  }
  else
  {
    bot.user.setActivity(`Serving ${bot.guilds.size} Guild`);
  }
});

//Login
bot.login(config.token);
