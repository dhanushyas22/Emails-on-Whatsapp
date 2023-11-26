var accountSid = process.env.ACCOUNT_SID;
var authToken = process.env.ACCOUNT_TOKEN;

const client = require('twilio')(accountSid, authToken, {
   lazyLoading: true
});

// Function to send message to WhatsApp
const sendMessage = async (senderID,message) => {
      try {
         await client.messages.create({
            from: `whatsapp:+14155238886`,
            body: message,
            to: senderID
         });
      } catch (error) {
         console.log(`Error at sendMessage --> ${error}`);
      }
};

module.exports = {
   sendMessage
};
