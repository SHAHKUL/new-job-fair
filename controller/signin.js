require("dotenv").config();
const Usermodel = require("../model/user");

const { sendMail } = require("../controller/sendmail");
const bycryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Verifymodel = require("../model/verifyuser");

async function InserVerifyUser(name, email, password) {
  try {
    var salt = bycryptjs.genSaltSync(1);
    var hash = bycryptjs.hashSync(password, salt);
    const token = generateToken(email);

    const newUser = new Verifymodel({
      name,
      email,
      password: hash,
      token,
    });
    const activateLink = `https://job-fair.onrender.com/signin/${token}`;
    const content = `<h4>Hi, There</h4>
        <h5>Welcome to the app</h5>
        <p>Thank You for signing up, clikc on the below link to activate</p>
        <a href=${activateLink}>Click here</a>
        <p>Regards</p> 
        <p>Team</p>
        `;

    await newUser.save();
    sendMail(email, "verifyuser", content);
  } catch (error) {
    console.log(error);
  }
}

function generateToken(email) {
  const token = jwt.sign(email, process.env.secret);
  return token;
}

async function InsertSignupUser(token) {
  try {
    const UserVerify = await Verifymodel.findOne({ token });
    if (UserVerify) {
      const newUser = new Usermodel({
        name: UserVerify.name,
        email: UserVerify.email,
        password: UserVerify.password,
        forgetPassword: {},
      });
      await newUser.save();
      await UserVerify.deleteOne({ token });
      const content = `<h4>Registration Successfull</h4>
      <h5>Welcome to the app</h5>
      <p>You are sucessfully registrated</p>
      <p>Regards</p> 
      <p>Team</p>
      `;
      sendMail(newUser.email, "Registration Successfull", content);
      return `<h4>Hi, There</h4>
     <h5>Welcome to the app</h5>
     <p>You are sucessfully registrated</p>
     <p>Regards</p> 
     <p>Team</p>
     `;
    }

    return `<h4>Registration Failed</h4>
  <p>Link expired...</p>
  <p>Regards</p> 
  <p>Team</p>`;
  } catch (error) {
    console.log(error);
    return `<html><body>
    <h4>Registration Failed</h4>
    <p>Unexpected Error happended.... </p>
    <p>Regards</p> 
    <p>Team</p> </body></html>`;
  }
}
module.exports = { InserVerifyUser, InsertSignupUser };
