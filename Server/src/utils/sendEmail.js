const nodemailer = require("nodemailer");

// Create transporter ONCE (important for performance)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


// Optional: verify connection once at startup
transporter.verify((error, success) => {
  if (error) {
    console.log("Mail server error:", error);
  } else {
    console.log("Mail server is ready to send messages");
  }
});

const sendEmail = async ({ to, subject, html, text }) => {
  try {
    if (!to || !subject) {
      throw new Error("Missing required email fields: to or subject");
    }

    const mailOptions = {
      from: `DigitalAgency <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text, // fallback for non-HTML clients
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return info;
  } catch (error) {
    console.error("Email send failed:", error.message);
    throw error; // important for API handling
  }
};

module.exports = sendEmail;