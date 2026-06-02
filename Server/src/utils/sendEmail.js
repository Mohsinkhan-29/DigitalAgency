const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("📨 sendEmail triggered");

    const result = await resend.emails.send({
      from: "Digital Agency <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    console.log("✅ Resend response:", result);

    return result;
  } catch (error) {
    console.error("❌ Resend error:", error);
    throw error;
  }
};

module.exports = sendEmail;