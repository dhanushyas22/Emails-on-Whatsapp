const sends = require('./send-message');

var email;
var subject;
var body;

const parse = {parser: function (message){
  var s = message;
  var temp = "";
  let content = [];
  var n = 0;
  for(var i = 0 ; i < s.length ; i++){
      if(s.charAt(i)=='|'){
          content[n] = temp;
          temp = "";
          n+=1;
          continue;
      }
      temp +=s.charAt(i);
  }
  content[n] = temp;
  email = content[0].trim();
  subject = content[1].trim();
  body = content[2].trim();
  
  console.log(email+'\n'+subject+'\n'+body+'\n');
  
  }
}

function sendEmail(senderID,message){
  parse.parser(message);
  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass
    }
  });

  var mailOptions = {
    from: user,
    to: email,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      sends.sendMessage(senderID,`Message sent successfully to ${email}. \n\nPlease check your mail.`);
    }
  });  

}

  module.exports = {
    sendEmail
 };

