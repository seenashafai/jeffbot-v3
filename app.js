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

  //Checks for botception
  if (message.author.bot) return;

  //Ping Pong
  if (msg === prefix + 'Ping')
  {
    message.channel.send('Pong!')
  }

  //Applies only to channel: get-jeffed
  if (message.channel.id === '475319240552087552')
  {
    var msgcontent = message.content
    console.log(msgcontent)
    message.delete()
    message.channel.send('Get Jeffed')
    var splitStringArray = msgcontent.split(" ")
    console.log(splitStringArray)
    var msgWordCount = splitStringArray.length
    console.log(msgWordCount)

    var i;
    for (i = 0; i < msgWordCount; i++) {
        message.channel.send('Jeff')
    }

    message.author.send('You just got Jeffed! Tag your friends to Jeff them also!')
  }
});

bot.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  if (bot.guilds.size > 1)
  {
    bot.user.setActivity(`Serving ${bot.guilds.size} Guilds`)
  }
  else
  {
    bot.user.setActivity(`Serving ${bot.guilds.size} Guild`)
  }
});




//Login
bot.login(config.token);
