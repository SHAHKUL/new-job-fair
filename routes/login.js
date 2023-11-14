const express = require("express");
const { AuthenticationUser } = require("../controller/login");
const LoginRouter = express.Router();


LoginRouter.post('/',async(req,res)=>{
try {

    const {email,password}=req.body
    var loginCreditional=await AuthenticationUser(email,password)

    if (loginCreditional==="Invalid User name or password") {
        res.status(200).send("Invalid User name or password") 
    } else if(loginCreditional==="server busy") {
        res.status(200).send("server busy")
    }else{
        res.status(200).json({token:loginCreditional.token})
    }
    
} catch (error) {
    console.log(error);
    res.status(500).send("server in login route")
}

})

module.exports=LoginRouter 