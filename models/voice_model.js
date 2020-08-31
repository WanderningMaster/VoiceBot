const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const voiceScheme = new Scheme({
   voice_path: String,
   sticker_unique_id: String
});

module.exports = voiceScheme;