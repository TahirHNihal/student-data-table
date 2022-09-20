const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//Create a send mail function
const sendMail = async (to, sub, data={}) => {
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
    html:`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
      integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"/>

    <style>
      @import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");
      * {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
      a {
        text-decoration: none;
      }
      .main-wrapper {
        background-color: #f2f6fc;
        height: 100vh;
        width: 100%;
        font-family: "Varela Round", sans-serif;

      }
      .wrapper {
        background: #fff;
        width: 550px;
        height: auto;
        padding: 40px 35px;
        border-radius: 5px;
        border-top: 7px solid #6b61fe;        
        margin: 180px auto;
      }
      .common-btn {
        color: #fff !important;
        background: #6b61fe;
        text-align: center;
        padding: 12px 15px;
        border-radius: 2px;
        border: none;
        transition: 0.5s;
        font-size: 14px;
      }
      .common-btn:hover {
        background: #ef2d56;
        color: #fff !important;
      }
      .body {
        padding: 20px 0;
      }
      .body h3 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .body p {
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 30px;
        line-height: 24px;
      }
      .social-menu {
        display: inline-block;
        display: flex;
        gap: 10px;
      }
      .social_menu_div {
        display: flex;
        align-items: center;
      }
      .social-menu li {
        list-style: none;
      }
      .social-menu li a {
        display: inline-block;
        text-align: center;
        background: #6b61fe;
        height: 30px;
        width: 30px;
        line-height: 30px;
        border-radius: 50%;
        transition: 0.5s;
      }
      .social-menu li a:hover {
        background: #ef2d56;
      }
      .social-menu li a i {
        color: #fff !important;
        font-size: 16px;
      }
      .social_menu_div p {
        margin-bottom: 0;
        margin-right: 10px;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <div class="main-wrapper">
      <div class="wrapper shadow-sm">
        <div class="header">
          <img
            width="300"
            src="https://www.devtahir.online/wp-content/uploads/2022/02/Devtahir-New-Logo1-1.png"
            alt=""
          />
        </div>
        <hr />
        <div class="body">
          <h3>Dear ${data.name},</h3>
          <p>
            You create an account on Dev Tahir. Please click on the button
            bellow to verify your account.
          </p>
          <a href="https://student-data-table.herokuapp.com/unverified/${data.token}" class="common-btn">Verify Now</a>
          <p style="margin-top: 40px">
            If you did't verify your email within 1 hour your account will
            remove. For support
            <a href="#" style="text-decoration: underline; color: #ef2d56"
              >devtahirsupport</a
            >
          </p>
          <p>Your Account Id is ${data.id}</p>
          <div class="social_menu_div">
            <p>Follow Us On:</p>
            <ul class="social-menu">
              <li>
                <a href="#"><i class="fab fa-facebook-f"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </li>
              <li>
                <a href="#"><i class="fab fa-twitter"></i></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

    
    `
  });
};

//Exports Module
module.exports = sendMail;
