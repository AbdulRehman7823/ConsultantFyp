const mongoose = require("mongoose");

const feedBackSchema = mongoose.Schema({
    userEmail: {type: 'string'},
    feedback: {type: 'string'}
});

const FeedBack = mongoose.model("FeedBack", feedBackSchema);
module.exports = FeedBack;
