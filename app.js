// app.js
// To launch server, enter 'node app.js' in CMD

/* Initialise Project & discord.js Calls */
const Discord = require('discord.js'); //Calling discord.js Package
const config = require('./config.json'); //Calling config.js File
const fs = require('fs'); //Required for logging
const date = require('Date');

const bot = new Discord.Client(); //Initialise discord bot instance

//global variables
var jeffRole = '';
var modRole = '';
var modArray = [];

//global constants
const prefix = (config.prefix); //Declares prefix as defined in config.js file


/* Listener Event: Message Received */
bot.on('message', message => {

    var stream = fs.createWriteStream('log.txt');

    /* Command-Argument separator */
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    /* Variables */
    let msg = message.content.toUpperCase(); //Converts entire message to upper case

    /* Checks for botception */
    if (message.author.bot) return;

    /* Ping Pong Function */
    if (msg === prefix + 'PING') //Checks for presence of prefix
    {
        message.channel.send('Pong!'); //Send 'Pong' in chat channel
        stream.once('open', function (fd) {
            stream.write(now() + "Pongged user " + message.author);
        })
    }

    /* Initialise bot in server function */
    if (msg === ">" + 'START')
    {
        message.guild.createRole({name:'Jeff'}); //Create role in server named Jeff
        message.channel.send('It is done'); //Send message to channel announcing that Jeff role has been created
        jeffRole = message.guild.roles.find("name", "Jeff") //Set variable 'jeffRole' to new Jeff role ID
    }

    /* Debugging function: Check for presence of Jeff role detected by the Bot*/
    if (msg === ">" + 'FINDJEFF')
    {
        console.log(jeffRole.name);
        console.log(jeffRole.id);
        message.channel.send(jeffRole.name)
    }

    if (command === 'jefficate')
    {
        jeffRole = message.guild.roles.find("name", "Jeff");
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) {
            return message.reply("Please mention a valid member of this server");
        }
        member.addRole(jeffRole).catch(console.error);

        console.log(member.username,'jefficated');
        console.log(jeffRole.id)
    }

    if (command === 'unjefficate')
    {
        if (message.member.roles.has(jeffRole.id)) return; //Checks for role (Jeff), Role ID hardcoded and prevents self-unjeffication
        console.log('Someone tried to unjefficate themselves...');
        jeffRole = message.guild.roles.find("name", "Jeff");
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        console.log(member);
        if(!member)
            return message.reply("Please mention a valid member of this server");
        member.removeRole(jeffRole).catch(console.error);

        console.log(member,'unjefficated');
        console.log(jeffRole.id)
    }

    //MARK: TODO
    if (command === 'setmod')
    {
        console.log(message.guild.members.get(args[0]));
        modRole = message.guild.roles.find("name", message.mentions.members.first());
        if (!modRole)
        {
            return message.reply("Please enter a valid role")
        }
        modArray.push(modRole);
        console.log(modArray);
        let modString = modArray.join(" "); //Turn array into string separated with spaces
        message.channel.send('Current mod roles:', modString)
    }

    /* Delete message and replace with Jeffs */

    if (!jeffRole) return;
    if (message.member.roles.has(jeffRole.id)) //Checks for roleID of role 'Jeff' initialised on >Start
    {
        /*  Handling original user message */
        message.delete(); //Delete the user's message from the chat channel
        let splitStringArray = message.content.split(" "); //Split message into words, create array of words
        let msgWordCount = splitStringArray.length; //Check how many words in the original message

        /*  For Loop to create array of 'jeff' */
        let i; //Declare loop variable
        let jeffArray = []; //Declare empty array
        jeffArray.push('Jeff');
        if (msgWordCount > 1)
        {
            for (i = 0; i < msgWordCount-1; i++) { //Loop through for number of words in message
                jeffArray.push('jeff') //Push 'jeff' to jeffArray
            }
        }

        /* Outputting jeffArray */
        let jeffString = jeffArray.join(" "); //Turn array into string separated with spaces
        message.channel.send(jeffString); //Send jeffString into chat channel
        message.author.send('You just got Jeffed! Tag your friends to Jeff them also!') //PM author of original message
    }
    else
    {
        message.channel.send('Please initialise JeffBot on your server by using ">start"');
    }
});


/* Event: Bot startup & successful login*/
bot.on("ready", () => {

    //Output basic statistics of bot to console
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity(`Serving ${bot.guilds.size} Guilds`) //Set Activity

    /* OLD - Activity selection
    if (bot.guilds.size > 1) //If bot is serving more than 1 guild
    {
      bot.user.setActivity(`Serving ${bot.guilds.size} Guilds`) //Set Activity
    }
    else //If bot is serving less than 2 guilds
    {
      bot.user.setActivity(`Serving ${bot.guilds.size} Guild`); //Set Activity
    }
    */
});

/* Login */
bot.login(config.token); //Bot login with token defined in config.js
