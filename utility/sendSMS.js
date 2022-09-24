// BULK SMS BD Setup
const axios = require("axios");

const sendSMS = async (to, mess) => {
  await axios
    .get(`https://bulksmsbd.net/api/smsapi?api_key=qc70Yd6ELeZBaqZNwSV2&type=text&number=${to}&senderid=8809601004411&message=${mess}`)
    .then((res) => {
      console.log(`SMS Send Successful`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = sendSMS;


