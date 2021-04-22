const Discord = require('discord.js');
const config = require('../config.json');
require('dotenv').config();

const client = new Discord.Client();

client.once('ready', () => {
  console.log('Tudo no grau!!!');
});

client.on('message', message => {
  const serverId = client.guilds.cache.get('832631330730410075');
  const usersList = serverId.members.cache.forEach(member => 
                      console.log('Usuários conectados: ', member.user.username)
                    );
  const directMessageId = message.content.match(/[^<@!]\d+/g);
  const thomaslnxUserId = '542764345273090061';
  
  const whoSendMeMessage = message.author.username;

  if (!directMessageId) {
    return ;
  } else if ((directMessageId[0] === thomaslnxUserId) && (whoSendMeMessage !== client.user.username)) {
    // console.log('Client object: ', client);
    message.channel.send(`@thomaslnx você recebeu uma mensagem do usuário ${whoSendMeMessage}!`)
  }
});

client.login(process.env.TOKEN);