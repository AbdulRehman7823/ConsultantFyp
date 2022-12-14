const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    userType: { type: String, required: true },
    password: { type: String, required: true },
    img: { type: String },
    documentImage: { type:String},
    scores: { type: Number},
    instructors:[
      {instructorId: { type: String}}
     ],
    requests: [
      {
        candidateId: { type: String },
        username: { type: String },
        email: { type: String },
        img: { type: String },
        data: { type: Object },
      },
    ],
    instructorCustomers: [
      {
        candidateId: { type: String },
        username: { type: String },
        email: { type: String },
        img: { type: String },
        data: { type: Object },
      },
    ],
    instructorAccepts: [
      {
        readerId: { type: String },
      },
    ],
    subscriptionfee: { type: Number },
  },
  { timestamps: true }
);
const user = mongoose.model("User", userSchema);
module.exports = user;
