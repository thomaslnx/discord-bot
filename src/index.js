const Discord = require('discord.js');
require('dotenv').config();

const smsClient = require('./services/sms.js');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Tudo no grau!!!');
});

client.on('message', message => {
  const botServer = client.guilds.cache.get(process.env.DISCORD_BOT_ID);
  let allServerUsers = [];
  let justOnLineUsers = [];
  botServer.members.guild.members.cache.map(user => allServerUsers.push({
    userName: user.user.username,
    userId: user.user.id
  }));

  botServer.members.guild.presences.cache.map(user => justOnLineUsers.push({
    userId: user.userID,
    userStatus: user.status
  }));

  console.log('Presença dos usuários: ', justOnLineUsers);
  // console.log('Objeto de presença dos usuários: ', botServer.members.guild.presences.cache);
  
  const directMessageId = message.content.match(/[^<@!]\d+/g);
  const thomaslnxUserId = process.env.PERSONAL_DISCORD_ID;
  
  const whoSendMeMessage = message.author.username;

  if (!directMessageId) {
    return ;
  } else if ((directMessageId[0] === thomaslnxUserId) && (whoSendMeMessage !== client.user.username)) {
    /**
     * Next feature: let user choose kind of message to sent for offline discord user: SMS or VOICE message
     */
    const thomasIsOnLine = users.includes('thomaslnx');
    console.log('Thomaslnx está on line? ', thomasIsOnLine);


    smsClient.messages.create({
      body: `New direct message from DISCORD user @${whoSendMeMessage}`,
      from: process.env.TWILIO_PHONE,
      to: process.env.DESTINATION_PHONE,
    })
    .then(message => {
      // console.log('Conteúdo do objeto message: ', message)
      const customMessage = `New direct message from DISCORD user @${whoSendMeMessage}`;
      message.body = customMessage;

      return message;
    })
    .catch(err => console.error('Error: ', err));
    
    message.channel.send(`@thomaslnx você recebeu uma mensagem do usuário ${whoSendMeMessage}!`)
  }
});

client.login(process.env.TOKEN);