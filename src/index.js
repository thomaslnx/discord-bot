const Discord = require('discord.js');

const config = require('../config.json');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Tudo no grau!!!');
});

client.on('message', message => {
  const directMessageId = message.content.match(/[^<@!]\d+/g);
  const thomaslnxUserId = '542764345273090061';
  
  const whoSendMeMessage = message.author.username;

  if (!directMessageId) {
    return ;
  } else if ((directMessageId[0] === thomaslnxUserId) && (whoSendMeMessage !== client.user.username)) {
    message.channel.send(`@thomaslnx você recebeu uma mensagem do usuário ${whoSendMeMessage}!`)
  }
});

client.login(config.token);