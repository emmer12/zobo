const nodemailer = require('nodemailer');
const Email = require('email-templates'); 
const path=require('path') 

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "83a36c2535d8b4",
    pass: "aefe655df42983"
  }
});

function sendConfirmationEmail1(user) {
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
    from: '"Buy Me Zobo" <info@bmz.com>', // sender address
    to: user.email, // list of receivers
    subject: "Password Reset", // Subject line
    html: `<b>To reset your password follow this link <a href="${user.generateResetPasswordLink()}">Click</a> to verify your email</b> ` // html body
  };
     transporter.sendMail(mailOptions)
}



function randomEmailwithTemplate(user){
 
const email = new Email({
  message: {
    from: 'hello@cellepay.com'
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport: {
    jsonTransport: true
  }
});
 
email
  .send({
    template: 'mars',
    message: {
      to: 'elon@spacex.com'
    },
    locals: {
      name: 'Emmer',
      user
    }
  })
  .then(res=>{
    console.log('====================================');
    console.log(res);
    console.log('====================================');
    })
  .catch(console.error);
}




function sendConfirmationEmail(user){
 
  const email = new Email({
    message: {
      from: process.env.EMAIL
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: {
      jsonTransport: true
    }
  });
   
  email
    .send({
      template: 'confirmation',
      message: {
        to: user.email
      },
      locals: {
        user
      }
    })
    .then(()=>{})
    .catch(console.error);
  }



  // .render({
  //     path: 'mars/html',
  //     juiceResources: {
  //       preserveImportant: true,
  //       webResources: {
  //         // view folder path, it will get css from `mars/style.css`
  //         relativeTo: path.resolve('mars')
  //       }
  //     }
  //   }, {
  //     name: 'Elon'
  //   })



module.exports = {
  sendConfirmationEmail,
  sendPasswordResetEmail,
  randomEmailwithTemplate
}
