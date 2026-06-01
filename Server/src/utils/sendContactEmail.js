const nodemailer = require("nodemailer");

const sendContactEmail = async ({
  name,
  email,
  phone,
  company,
  message,
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // IMPORTANT for 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>New Contact Form Submission</h2>

        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 8px; font-weight: bold;">Name</td>
            <td style="padding: 8px;">${name || "N/A"}</td>
          </tr>

          <tr>
            <td style="padding: 8px; font-weight: bold;">Email</td>
            <td style="padding: 8px;">${email || "N/A"}</td>
          </tr>

          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone</td>
            <td style="padding: 8px;">${phone || "N/A"}</td>
          </tr>

          <tr>
            <td style="padding: 8px; font-weight: bold;">Company</td>
            <td style="padding: 8px;">${company || "N/A"}</td>
          </tr>
        </table>

        <h3>Message</h3>
        <p>${message || "No message provided"}</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Form - ${name}`,
      html,
    });

    console.log("Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email sending failed:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendContactEmail;