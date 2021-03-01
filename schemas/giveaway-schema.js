const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true
}

const giveawaySchema = mongoose.Schema({
    _id: reqString,
    userId: reqString,
    userName: reqString
});

module.exports = mongoose.model('giveaway', giveawaySchema);