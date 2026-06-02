const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const buildHTML = ({ name, email, phone, company, message }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; color:#222;">
      
      <h2 style="color:#16A34A;">📩 New Contact Form Submission</h2>

      <p>You received a new message from your website contact form.</p>

      <table style="width:100%; border-collapse:collapse; margin-top:15px;">
        
        <tr>
          <td style="padding:8px; font-weight:bold;">Name</td>
          <td style="padding:8px;">${name || "N/A"}</td>
        </tr>

        <tr style="background:#f9f9f9;">
          <td style="padding:8px; font-weight:bold;">Email</td>
          <td style="padding:8px;">${email || "N/A"}</td>
        </tr>

        <tr>
          <td style="padding:8px; font-weight:bold;">Phone</td>
          <td style="padding:8px;">${phone || "N/A"}</td>
        </tr>

        <tr style="background:#f9f9f9;">
          <td style="padding:8px; font-weight:bold;">Company</td>
          <td style="padding:8px;">${company || "N/A"}</td>
        </tr>
      </table>

      <h3 style="margin-top:20px;">💬 Message</h3>
      <p style="background:#f4f4f4; padding:12px; border-left:4px solid #16A34A;">
        ${message || "No message provided"}
      </p>

      <hr style="margin-top:20px;" />

      <p style="font-size:12px; color:#777;">
        Sent via Digital Agency Contact System
      </p>
    </div>
  `;
};

const sendContactEmail = async ({ name, email, phone, company, message }) => {
  try {
    console.log("📨 Resend contact email triggered");

    const result = await resend.emails.send({
      from: "Digital Agency <onboarding@resend.dev>",

      // 🔒 HARD-CODED ADMIN EMAIL (your inbox)
      to: "mohsinkhan292003@gmail.com",

      subject: `📩 New Contact Form - ${name || "Unknown"}`,

      html: buildHTML({ name, email, phone, company, message }),
    });

    console.log("✅ Resend response:", result);

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error("❌ Resend error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendContactEmail;