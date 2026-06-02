const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ name, email, message }) => {
  try {
    console.log("📨 sendEmail triggered");

    const result = await resend.emails.send({
      from: "Digital Agency <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email",
      html: `<p>${message}</p>`,
    });

    console.log("✅ Resend response:", result);

    return result;
  } catch (error) {
    console.error("❌ Resend FULL error:", error);
    throw error;
  }
};

console.log("hitted email");

module.exports = sendEmail;