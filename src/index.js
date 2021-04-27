const Discord = require('discord.js');
require('dotenv').config();

const smsClient = require('./services/sms.js');

const client = new Discord.Client();
let authorFromMention = '';

client.once('ready', () => {
  console.log('Tudo no grau!!!');
});

client.on('message', message => {
  const botServer = client.guilds.cache.get(process.env.DISCORD_BOT_ID);
  let allServerUsers = [];
  let justOnLineUsers = [];
  // All users of channel.
  botServer.members.guild.members.cache.map(user => allServerUsers.push({
    userName: user.user.username,
    userId: user.user.id
  }));

  // Just users online at the moment.
  botServer.members.guild.presences.cache.map(user => justOnLineUsers.push({
    userId: user.userID,
    userStatus: user.status
  }));

  // console.log('Presença dos usuários: ', justOnLineUsers);
  // console.log('Objeto de presença dos usuários: ', botServer.members.guild.presences.cache);
  
  const directMessageId = message.content.match(/[^<@!]\d+/g);
  const thomaslnxUserId = process.env.PERSONAL_DISCORD_ID;
  const whoSendMeMessage = message.author.username;

  if (!directMessageId && whoSendMeMessage === authorFromMention[0]?.name) {
    console.log('To dentro da mensagem depois da resposta do bot com o usuário que enviou a menção: ', authorFromMention[0].name)
    return ;
  } else if ((directMessageId[0] === thomaslnxUserId) && (whoSendMeMessage !== client.user.username)) {
    /**
     * Next feature: let user choose kind of message to sent for offline discord user: SMS or VOICE message
     */
    let thomasIsOnLine;

    justOnLineUsers.forEach(user => {
      if (user.userId === thomaslnxUserId) {
        thomasIsOnLine = 'online';
        return thomasIsOnLine;
      } else {
        thomasIsOnLine = 'offline';
        return thomasIsOnLine;
      }
    });

    /**
     * If thomaslnx is offline user who send message is warned about it and have to choose how to notify them
     * or with sms or voice message.
     */
    thomasIsOnLine === 'offline' && message.reply('The user @thomaslnx is off line. How would you like him to know that you want to talk to him? SMS or VoiceMessage?`')
      .then(message => {
        authorFromMention = message.mentions.users.map(mention => ({
          id: mention.id,
          name: mention.username,
        }));
      });
      
      // smsClient.messages.create({
        //   body: `New direct message from DISCORD user @${whoSendMeMessage}`,
        //   from: process.env.TWILIO_PHONE,
        //   to: process.env.DESTINATION_PHONE,
        // })
        // .then(message => message)
        // .catch(err => console.error('Error: ', err));
        
        // message.channel.send(`@thomaslnx você recebeu uma mensagem do usuário ${whoSendMeMessage}!`)
  }
});

client.login(process.env.TOKEN);