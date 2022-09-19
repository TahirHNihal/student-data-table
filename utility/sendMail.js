const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//Create a send mail function
const sendMail = async (to, sub, name) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transport.sendMail({
    from: `"Verify Account" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: sub,
    text: `Hi ${name}, Verify your email.`,
  });
};

//Exports Module
module.exports = sendMail;
