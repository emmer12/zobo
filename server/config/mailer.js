const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "83a36c2535d8b4",
    pass: "aefe655df42983"
  }
});

function sendConfirmationEmail(user) {
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Tunner" <info@tunner.com>', // sender address
    to: user.email, // list of receivers
    subject: "Account Verification ", // Subject line
    html: `<b>Welcome to Tunner <a href="${user.generateConfirmationUrl()}">Click</a> to verify your email</b> ` // html body
  };
     transporter.sendMail(mailOptions)
}

function sendPasswordResetEmail(user) {
  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Tunner" <info@tunner.com>', // sender address
    to: user.email, // list of receivers
    subject: "Password Reset", // Subject line
    html: `<b>To reset your password follow this link <a href="${user.generateResetPasswordLink()}">Click</a> to verify your email</b> ` // html body
  };
     transporter.sendMail(mailOptions)
}

module.exports = {
  sendConfirmationEmail,
  sendPasswordResetEmail
}
