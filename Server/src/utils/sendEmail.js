const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "DigitalAgency <mohsinkhan292003@gmail.com>",
      to,
      subject,
      html,
    });

    console.log("Email sent:", data.id);
    return data;
  } catch (error) {
    console.error("Resend error:", error);
    throw error;
  }
};

module.exports = sendEmail;