const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: 'noreply',
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
