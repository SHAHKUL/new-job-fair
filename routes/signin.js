const express = require("express");
const { checkUser } = require("../controller/login");
const { InserVerifyUser, InsertSignupUser } = require("../controller/signin");
const router = express.Router();

router.get("/:token", async (req, res) => {
  try {
    const response = await InsertSignupUser(req.params.token);
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(
      `<html>
        <body>
          <h4>Registration Failed</h4>
          <p>Link Expired.... </p>
          <p>Regards</p>
          <p>Team</p>
        </body>
      </html>`
    );
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    console.log(name, email, password);
    const registerCreditional = await checkUser(email);
    if (registerCreditional === false) {
      await InserVerifyUser(name, email, password);
      res.status(200).send(true);
    } else if (registerCreditional === true) {
      res.status(200).send(false);
    } else if (registerCreditional === "server busy") {
      res.status(500).send("server busy");
    }
  } catch (error) {
    console.log(error);
  }
});

// router.get('/',async(req,res)=>{

// })

// router.get('/',async(req,res)=>{

// })

module.exports = router;
