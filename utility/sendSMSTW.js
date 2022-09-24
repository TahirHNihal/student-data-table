
// Twilio SMS Setup
const twilio = require("twilio")(process.env.SID, process.env.AUTH_TOKEN);
const twilio_cell = process.env.TWILIO_CELL;
const sendSMSTW =  (to, sms) => {
   twilio.messages
    .create({
      from: twilio_cell,
      to: to,
      body: sms,
    })

    .then((res) => {
      console.log("SMS Send Successful");
    })
    .catch((err) => {
      console.log(err.message);
    });

  console.log(to, sms);
};

module.exports = sendSMSTW;