require("dotenv").config();
const Usermodel = require("../model/user");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
var clients = require("../redis");
const Verifymodel = require("../model/verifyuser");

async function checkUser(email) {
  try {
    const user = await Usermodel.findOne({ email });
    console.log(user);
    if (user) {
      return true;
    }
    return false;
  } catch (error) {
    return "server busy";
  }
}

async function AuthenticationUser(email, password) {
  try {
    const userCheck = await Usermodel.findOne({ email });

    if (userCheck) {
      const validPassword = bcryptjs.compareSync(password, userCheck.password);
      if (validPassword) {
        const token = jwt.sign({ email }, process.env.login_secret);
        const response = {
          id: userCheck._id,
          name: userCheck.name,
          email: userCheck.email,
          token: token,
          status: true,
        };
        await clients.set(`key-${email}`, JSON.stringify(response));

        await Usermodel.findOneAndUpdate(
          { email: userCheck.email },
          { $set: { token: token } },
          { new: true }
        );
        return response;
      }

      return "Invalid User name or password";
    }
      return "Invalid User name or password";
    
  } catch (error) {
    console.log(error);
    return "server busys";
  }
}

async function AuthorizationUser(token) {
  try {
    const decode = jwt.verify(token, process.env.login_secret);

    if (decode) {
      const email = decode.email;

      const auth = await clients.get(`key-${email}`);

      if (auth) {
        const data = JSON.parse(auth);
        // console.log(data);
        return data;
      } else {
        ////////////if any prblm
        const data = await Usermodel.findOne({ email });

        return data;
      }
    }

    return false;
  } catch (error) {
    console.log(error);
  }
}
module.exports = { checkUser, AuthenticationUser, AuthorizationUser };
