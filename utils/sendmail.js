const nodemailer = require('nodemailer');

const sendmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: 'hotmail',
    auth: {
      user: 'ade_epick@outlook.com',
      pass: 'Google767',
    },
  });
  const mailOptions = {
    from: 'Rilwan from Karpos <ade_epick@outlook.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transport.sendMail(mailOptions);
};
module.exports = sendmail;
