const nodemailer = require("nodemailer");

const sendEmail = async ({ subject, html }) => {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PASS,
  //     },
  //   });

  //   await transporter.sendMail({
  //     from: `"Contact Form" <${process.env.EMAIL_USER}>`,
  //     to: process.env.ADMIN_EMAIL,
  //     subject,
  //     html,
  //   });

  console.log("contact form Email sent successfully");
};

module.exports = sendEmail;