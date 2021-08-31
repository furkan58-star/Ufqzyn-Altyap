const config = require('../config.json');
const Discord = require('discord.js')
const sure = 2.5
const beklememesaji = `Bu Komutu Tekrar Kullanabilmek İçin \`${sure}\` Saniye Beklemelisin!`
let yazma = new Set();
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.split(' ')[0].slice(config.prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
    if (yazma.has(message.author.id)) {
        return message.channel.send(beklememesaji)
    }
  } else if (client.aliases.has(command)) {
    if (yazma.has(message.author.id)) {
        return message.channel.send(beklememesaji);
    }
    cmd = client.commands.get(client.aliases.get(command));
  };
  if (cmd) {
    if(!message.guild) {
      if(cmd.config.guildOnly === true) {
        return;
      };
    };
    cmd.run(client, message, params);
};
};