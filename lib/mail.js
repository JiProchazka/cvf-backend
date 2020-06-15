const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  requiresAuth: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.link = (options) => {
  const link = `${process.env.FE_URL}/#/guide/${options.id}`;

  var mailOptions = {
    from: process.env.MAIL_FROM,
    to: options.to,
    subject: "Your new Custom Verification Form",
    text: `Hello, we kindly ask you to fill this Customer Verification Form: ${link}`,
    html: `Hello,<br /><br />we kindly ask you to fill this Customer Verification Form <a href="${link}">${link}</a><br /><br />With Regards`,
  };

  transport.sendMail(mailOptions);
};
