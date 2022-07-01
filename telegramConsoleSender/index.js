require('dotenv').config();
const { Command } = require('commander');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const chatID = process.env.CHAT_ID;
const bot = new TelegramBot(token, { polling: true });
const program = new Command();

const myMessagtBot = async (message) => {
  await bot.sendMessage(chatID, message);
  process.exit();
};
const myPhotoBot = async (url) => {
  await bot.sendPhoto(chatID, url);
  process.exit();
};

program
  .version('0.0.1')
  .option('-m, --message <type>', 'Your message')
  .option('-p, --photo <type>', 'Your photo')

  .parse(process.argv);
const options = program.opts();

if (options.message) {
  myMessagtBot(options.message);
} else if (options.photo) {
  myPhotoBot(options.photo);
}
