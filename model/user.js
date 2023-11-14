const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    uniqued: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  forgetPassword: {
    time: Date,
    otp: String,
  },
  joinedOn: {
    type: Date,
    default: Date.now(),
  },
});

const Usermodel = mongoose.model("verifyusers", Schema);
module.exports = Usermodel;
