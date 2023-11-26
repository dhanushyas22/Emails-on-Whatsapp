var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.ACCOUNT_TOKEN;

const client = require('twilio')(accountSid, authToken, {
   lazyLoading: true
});

// Function to send message to WhatsApp
const aboutMessage = async (senderID) => {
      try {
         await client.messages.create({
            from: `whatsapp:+14155238886`,
            body: '*Hello there, Welcome to Email on Whatsapp.*\n\n' + 
                  'This is our college mini project developed by \n\nDhanush Karthik K S(20TUCS034)' +
                  '\nDhanushya S (20TUCS036)\nGayathri D (20TUCS040) \n' +
                  ' \nUnder the guidance of \n\n*Mr.Ragunathan*,\n' +
                  'Department of Computer Science and Enginnering,\nSri Krishna College of Technology.\n\nSend "send" to send email',
            to: senderID
         });
      } catch (error) {
         console.log(`Error at sendMessage --> ${error}`);
      }
};

module.exports = {
   aboutMessage
};
