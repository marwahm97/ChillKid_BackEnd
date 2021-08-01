var express = require ('express')
var router = express.Router()

var nodemailer = require('nodemailer');



router.route("/").post((req, res, next) => {
  const toEmail = req.body.email
  
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "1eb3062042ce7f",
      pass: "f13825c4affdb8"
    }
  });
  
  var mailOptions = {
    from: 'chillKid@gmail.com',
    to: toEmail,
    subject: 'Reset Password',
    text: 'Salut, Suivez ce lien qui vous permettra de reuinitialiser votre mot de passe ',
    html: '<b>Salut</b><br> Suivez ce lien qui vous permettra de reuinitialiser votre mot de passe<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
    
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  res.send('mail sended')

  
});
module.exports = router;