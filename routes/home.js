const express = require("express");
const { AuthorizationUser } = require("../controller/login");
const HomeRoute = express.Router();

HomeRoute.get("/", async (req, res) => {
  try {
    const auth_token = req.headers.auth;

    const loginCredentional =await  AuthorizationUser(auth_token);
    console.log(loginCredentional);
    if (loginCredentional === false) {
      res.status(200).send("Invalid Token");
    } else {
      res.json(loginCredentional);
    }
  } catch (error) {
    console.log(error);
    res.status.send("server busy");
  }
});

module.exports = HomeRoute;
