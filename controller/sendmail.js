require('dotenv').config()

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
service:"gmail",
  auth: {
    user:process.env.nodemailer_user,
    pass:process.env.nodemailer_pass
  },
});



function sendMail(toEmail,subject,content){
    const mailOption={
        from:"shahkulhameed@gmail.com",
        to:toEmail,
        subject:subject,
        html:content
    }


    transporter.sendMail(mailOption,(err,info)=>{
        if(err){
            console.log('error occured',err);
            
        }else{
            console.log("email sent",info.response);
        }
    })
}


module.exports={sendMail}