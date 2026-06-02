const nodemailer = require("nodemailer");

const sendSubscriptionEmail = async ({ email }) => {
  try {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // must be Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>New Newsletter Subscription</h2>

        <p><strong>Email:</strong> ${email}</p>

        <p style="margin-top: 20px; color: gray;">
          Subscribed at: ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Website Newsletter" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "New Newsletter Subscription",
      html,
    });

    console.log("Subscription email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Subscription Email Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendSubscriptionEmail;