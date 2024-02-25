const mongoose = require('mongoose');

const MarketInfoSchema = new mongoose.Schema({
    images: [String],
    names: {
        en: String,
        ru: String,
        kz: String
    },
    descriptions: {
        en: String,
        ru: String,
        kz: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    deletedAt: Date
});

const MarketInfo = mongoose.model('MarketInfo', MarketInfoSchema);
module.exports = MarketInfo;
