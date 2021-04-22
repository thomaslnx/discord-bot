const Discord = require('discord.js');
require('dotenv').config();

const smsClient = require('./services/sms.js');

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Tudo no grau!!!');
});

client.on('message', message => {
  const serverId = client.guilds.cache.get('832631330730410075');
  let users = [];
  const usersList = serverId.members.cache.forEach(member =>
    users.push(member.user.username)
  );
  const directMessageId = message.content.match(/[^<@!]\d+/g);
  const thomaslnxUserId = '542764345273090061';
  
  const whoSendMeMessage = message.author.username;

  if (!directMessageId) {
    return ;
  } else if ((directMessageId[0] === thomaslnxUserId) && (whoSendMeMessage !== client.user.username)) {
    /**
     * Next feature: let user choose kind of message to sent for offline discord user: SMS or VOICE message
     */
    smsClient.messages.create({
      body: `New direct message from DISCORD user @${whoSendMeMessage}`,
      from: '+19104904325',
      to: '+556399946-1326'
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