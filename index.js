const telegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./CONFIG');

const bot = new telegramBot(config.TOKEN, {
    polling: true
});


//TODO: Create /start command
bot.onText(/\/new/, (msg) => {
   bot.sendMessage(msg.chat.id, 'Send me sticker');
   bot.on('sticker', (msg) => {
       const unique_id = msg.sticker.file_unique_id;
       bot.sendMessage(msg.chat.id, 'Now send me voice');
       bot.on('voice', (msg) => {
           let id = msg.voice.file_id;
           let path = bot.downloadFile(id, "./public")
               .then( (path) => {
                   console.log(path);
                   const file_path = path;
               });

           //adding bunch on db

           bot.sendMessage(msg.chat.id, 'Completed!');
       });
   });
});
