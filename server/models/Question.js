const mongoose = require("mongoose");

const testModel = mongoose.Schema({
            questionText: { type: String, required: true},
            questionImage: { type: String},
            questionType: { type: String},
            option1:{ type: String},
            option2:{ type: String},
            option3:{ type: String},
            option4:{ type: String},
            suggestions:[{type:String}],
            score:{ type: Number, default:5},
            answerText: { type: String},
            answerIndex: { type: Number},
});

const test = mongoose.model("Test", testModel);
module.exports = test;
