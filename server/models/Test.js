const mongoose = require("mongoose");

const testModel = mongoose.Schema({
  instructorId: { type: String},
  title: { type: String, required: true, unique: true },
  description: { type: String },
  img: { type: String },
  testQuestions:[
    {

    }
  ]
});

const test = mongoose.model("Test", testModel);
module.exports = test;
