require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios').default;

const token = process.env.TOKEN;
const url = process.env.URL;

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  if (msg.text === 'photo') {
    console.log(`Пользователь ${msg.from.username}  запросил картинку.`);
    axios
      .request({
        method: 'GET',
        url: 'https://picsum.photos/200/300',
        maxRedirects: 0,
        validateStatus: () => true,
      })
      .then((response) => {
        bot.sendPhoto(msg.chat.id, response.headers.location);
      });
  } else {
    console.log(`Пользователь ${msg.from.username} написал:'${msg.text}'`);
    bot.sendMessage(msg.chat.id, `Вы написали '${msg.text}'`);
  }
});
