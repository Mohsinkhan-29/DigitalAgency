const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const buildAdminMessage = (email) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#222;">
      
      <h2 style="color:#16A34A;">📩 New Newsletter Subscription</h2>

      <p>A new user has subscribed to your website newsletter.</p>

      <div style="padding:12px; background:#f4f4f4; border-left:4px solid #16A34A;">
        <p><b>Subscriber Email:</b> ${email}</p>
      </div>

      <p style="margin-top:20px;">
        You can now add this email to your marketing list or CRM.
      </p>

      <br/>

      <p>— Digital Agency System</p>
    </div>
  `;
};

const sendEmail = async ({ email }) => {
  try {
    console.log("📨 Subscription email triggered");

    const result = await resend.emails.send({
      from: "Digital Agency <onboarding@resend.dev>",
      to: "mohsinkhan292003@gmail.com", // 🔒 YOUR HARD-CODED EMAIL
      subject: "🆕 New Newsletter Subscription",
      html: buildAdminMessage(email),
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