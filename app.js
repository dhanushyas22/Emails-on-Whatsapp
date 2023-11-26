const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const webApp = express();

webApp.use(bodyParser.urlencoded({
    extended: true
}));

webApp.use(bodyParser.json());

const PORT = process.env.PORT;

webApp.get('/', (req,res) => {
    res.send('Hello world...!');
});

const WA = require('./callback-messages/callback-message');
const about = require('./callback-messages/about');
const send = require('./callback-messages/send-message');
const sendMail = require('./callback-messages/sendEmail');


webApp.post('/whatsapp',async (req,res) => {
    let message = req.body;
    let senderID = req.body.From;

    console.log(message);

    // Write a function to send message back to WhatsApp
    if(message.Body.toLowerCase() === 'check'){
        await WA.sendMessage('__check', senderID);
    }
    else if(message.Body.toLowerCase() === 'send'){
        await send.sendMessage(senderID,"Enter your content in the following order to send mail.\n\nReciever mail id | Body | Content");
        // await sendMail.sendEmail(senderID,message.Body);
    }else if(/^[a-z0-9+_.-]+@[a-zA-Z0-9.-\s]+\|.|\n+$/.test(message.Body)){
        // await send.sendMessage(senderID,message.Body);
        sendMail.sendEmail(senderID,message.Body);
    }
    else if(message.Body.toLowerCase() === 'about'){
        await about.aboutMessage(senderID);
    }
    else{
        await WA.sendMessage('*Welcome to Email on WhatsApp,* \n\n' + 
        'Please send "send" to send email \n\nor \n\nSend "about" to get details about the developers', senderID);
    }
});

webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});