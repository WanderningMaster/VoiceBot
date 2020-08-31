const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const voiceScheme = new Scheme({
   voice_name: String,
   sticker_unique_id: String
});