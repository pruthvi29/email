var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
var path = require("path");
app.use(express.static(__dirname));
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    secure: false, // use SSL
    port: 25, // port for secure SMTP
    host: "smtp.gmail.com",
    auth: {
        user: "your email erwer",
        pass: "password"
    },
    tls: {
        rejectUnauthorized: false
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/
app.get('/fintas.css', function(req, res) {
  res.sendFile(__dirname + "/" + "fintas.css");
});
app.get('/',function(req,res){
    //res.sendfile('index.html');
   res.sendFile(path.join(__dirname + '/index.html')); 
});
app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error,response);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});