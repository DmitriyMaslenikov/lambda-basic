require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const massageWeatherHTML = require('./html/massageWeatherHTML.js');
const massageWindHTML = require('./html/massageWindHTML.js');
const massageCurrencyHTML = require('./html/massageCurrencyHTML.js');

const token = process.env.TOKEN;
const port = process.env.PORT || 443;
const host = process.env.HOST;
const externalUrl = process.env.CUSTOM_ENV_VARIABLE;

const bot = new TelegramBot(token, {
  webHook: {
    port: port,
    host: host,
  },
});

bot.setWebHook(externalUrl + ':443/bot' + token);
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Добро пожаловать в мой телеграм бот!', {
    reply_markup: {
      keyboard: [['/Погода'], ['/Курс валют']],
    },
  });
});
bot.onText(/\/Погода/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Выберите интервал для просмотра погоды или вернитесь в предыдущее меню. ',
    {
      reply_markup: {
        keyboard: [
          ['C интервалом 3 часа', 'C интервалом 6 часов'],
          ['Ветер'],
          ['Предыдущее меню'],
        ],
      },
    }
  );
});
bot.onText(/\/Курс валют/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    'Выберите валюту или вернитесь в предыдущее меню. ',
    {
      reply_markup: {
        keyboard: [['USD', 'EUR'], ['Предыдущее меню']],
      },
    }
  );
});
bot.onText(/Предыдущее меню/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Посмотреть погоду или курс валют? ', {
    reply_markup: {
      keyboard: [['/Погода'], ['/Курс валют']],
    },
  });
});
bot.onText(/C интервалом 6 часов/, (msg) => {
  massageWeatherHTML.massage(2).then((massage) => {
    bot.sendMessage(msg.chat.id, massage, {
      parse_mode: 'HTML',
    });
  });
});
bot.onText(/C интервалом 3 часа/, (msg) => {
  massageWeatherHTML.massage(1).then((massage) => {
    bot.sendMessage(msg.chat.id, massage, {
      parse_mode: 'HTML',
    });
  });
});
bot.onText(/Ветер/, (msg) => {
  massageWindHTML.massage(1).then((massage) => {
    bot.sendMessage(msg.chat.id, massage, {
      parse_mode: 'HTML',
    });
  });
});
bot.onText(/USD/, (msg) => {
  massageCurrencyHTML.massage('USD', 'UAH').then((massage) => {
    bot.sendMessage(msg.chat.id, massage, {
      parse_mode: 'HTML',
    });
  });
});
bot.onText(/EUR/, (msg) => {
  massageCurrencyHTML.massage('EUR', 'UAH').then((massage) => {
    bot.sendMessage(msg.chat.id, massage, {
      parse_mode: 'HTML',
    });
  });
});
