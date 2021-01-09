const mongoose = require('mongoose'),
urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    date: {
        type: String,
        default: Date.now
    }
});

module.exports = mongoose.model('URL', urlSchema);