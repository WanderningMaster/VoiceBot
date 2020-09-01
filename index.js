const telegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./CONFIG');
const voiceScheme = require('./models/voice_model');
const needle = require('needle');

const bot = new telegramBot(config.TOKEN, {
    polling: true
});
const Bunch = mongoose.model("Bunch", voiceScheme);
let inCommand = true;
//TODO: Create /start command
bot.onText(/\/new/, (msg) => {
   bot.sendMessage(msg.chat.id, 'At first send me sticker, then send voice');
   bot.on('sticker', async (msg) => {

       const unique_id = msg.sticker.file_unique_id; //sticker_unique_id

       bot.on('voice', (msg) => {
           let id = msg.voice.file_id;
           let file;
           let path = bot.downloadFile(id, "./public").then(function (path) {

               console.log(`voice path: ${path}, sticker_unique_id: ${unique_id}`);
               //adding bunch on db
               mongoose.connect('mongodb://localhost:27017/voicepackdb', { useNewUrlParser: true });
               const bunch = new Bunch({
                   voice_path: path,
                   sticker_unique_id: unique_id
               });

               bunch.save((err) => {
                  if(err) return console.log(err);
                  console.log("Object saved", bunch);
               });
           });
           //nevermind... it works and thanks for that



           bot.sendMessage(msg.chat.id, 'Completed!');
       });
   });
});

mongoose.connect('mongodb://localhost:27017/voicepackdb', { useNewUrlParser: true });//reconnecting to db
//doing magic
bot.on('sticker', async (msg) => {
    inCommand = false;
    //console.log(msg);
    const unique_id = msg.sticker.file_unique_id;
    //console.log(unique_id);]

    Bunch.find({sticker_unique_id: unique_id}, (err, docs) => {
        if(err) return console.log(err);
        if(docs.length > 0){

            bot.deleteMessage(msg.from.id, msg.message_id);
            bot.sendVoice(msg.chat.id, docs[0].voice_path);
        }
    });
});

