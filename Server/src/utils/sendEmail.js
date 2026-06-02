const { Resend } = require("resend");

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/test-email", async (req, res) => {
  try {
    const result = await resend.emails.send({
      from: "Digital Agency <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email",
      html: "<h1>Hello from Resend</h1>",
    });

    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

const sendEmail = async ({ name, email, message }) => {
  try {
    // 1️⃣ Email to ADMIN
    await resend.emails.send({
      from: "Digital Agency <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Contact Form Message",
      html: `
        <h2>New Message Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    // 2️⃣ Confirmation email to USER
    await resend.emails.send({
      from: "Digital Agency <onboarding@resend.dev>",
      to: email,
      subject: "✅ We received your message",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>Hi ${name},</h2>
          <p>Thanks for contacting us. We’ve received your message and will get back to you soon.</p>

          <hr />

          <h3>Your message:</h3>
          <p>${message}</p>

          <br />
          <p>— Digital Agency Team</p>
        </div>
      `,
    });

    return
    console.log("email sent");
    true;
  } catch (error) {
    console.error("Resend Error:", error);
    throw error;
  }
};

module.exports = sendEmail;