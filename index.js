const telegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./CONFIG');

const bot = new telegramBot(config.TOKEN, {
    polling: true
});

bot.on('message', (msg) => {
    //console.log(msg);
    bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`)
});