const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, name, email, message }) => {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; background:#f6f6f6; padding:30px;">
        
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:25px; border-radius:10px; border:1px solid #eee;">
          
          <h2 style="color:#16a34a; margin-bottom:10px;">
            📩 New Contact Form Submission
          </h2>

          <p style="color:#555; font-size:14px;">
            You have received a new message from your website.
          </p>

          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />

          <p><strong>Name:</strong> ${name || "N/A"}</p>
          <p><strong>Email:</strong> ${email || "N/A"}</p>

          <div style="margin-top:15px;">
            <strong>Message:</strong>
            <p style="background:#f9f9f9; padding:15px; border-radius:8px; color:#333; line-height:1.5;">
              ${message || ""}
            </p>
          </div>

          <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />

          <p style="font-size:12px; color:#888;">
            This email was sent from your DigitalAgency contact form.
          </p>

        </div>

      </div>
    `;

    const data = await resend.emails.send({
      from: "DigitalAgency <onboarding@resend.dev>",
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