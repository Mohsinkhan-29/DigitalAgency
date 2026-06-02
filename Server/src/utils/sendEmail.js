const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ name, email, message }) => {
  try {
    const data = await resend.emails.send({
      from: "Digital Agency <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "New Contact Form Message",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return data;
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
};

module.exports = sendEmail;