const mongoose = require('mongoose');
const reviewItem = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
    link: String,
    title: String
});
module.exports = mongoose.model('linkitem', linkItem);