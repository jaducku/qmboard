const mongoose = require('mongoose');
const reviewItem = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    srno: String,
    srtitle: String,
    charger: String,
    developer: String,
    date: String,
    site: String,
    risk: String,
    status : String
});
module.exports = mongoose.model('reviewItem', reviewItem);