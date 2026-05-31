const { Resend } = require("resend");

// Initialize Resend once
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email using Resend
 */
const sendEmail = async ({ to, subject, name, email, message }) => {
  try {
    // Professional email template
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

    // Send email
    const response = await resend.emails.send({
     from: "DigitalAgency <noreply@digital-agency-dun.vercel.app>",
      to,
      subject,
      html,
    });

    // ✅ Correct logging (FIXED)
    if (response.error) {
      console.error("Resend error:", response.error);
      throw new Error(response.error.message);
    }

    console.log("Email sent successfully:", response.data?.id);

    return response;
  } catch (error) {
    console.error("Email send failed:", error);
    throw error;
  }
};

module.exports = sendEmail;