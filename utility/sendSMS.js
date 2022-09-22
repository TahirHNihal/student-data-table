const axios = require("axios");

const sendSMS = async (to, mess) => {
 await axios.get(`https://bulksmsbd.net/api/smsapi?api_key=qc70Yd6ELeZBaqZNwSV2&type=text&number=${to}&senderid=8809601004411&message=${mess}`)
    .then((res) => {
      console.log(`Ok`);
    })
    .catch((err) => {
      console.log("Not Ok");
    });
    console.log(to);
    console.log(mess);
};

module.exports = sendSMS;
