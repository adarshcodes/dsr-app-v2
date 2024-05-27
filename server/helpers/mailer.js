
const nodemailer = require("nodemailer");

// Creates a transport that sends messages to Gmail. We do this by setting the transport's flags to allow HTTPS
let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "noreply@Quadrafort.com",
      pass: "Nan63206",
    },
  });
/**
 * Send email to DASHRAE RIABUV and UPAD HyayY
 */
function sendEmail( userMail) {
    let mailOptions = {
      from: "noreply@Quadrafort.com",
      to: userMail,
      subject: "Your daily DSR is not submitted",
      text: "Hello, you have not submitted your daily DSR. Please do the same by end of day. Ignore if submitted.",
    };
  
    /**
     * @param error
     * @param info
     */
    transporter.sendMail(mailOptions, function (error, info) {
      // Send the email to the server.
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  module.exports = {sendEmail};