const Subscriber = require("../models/Subscriber");
const sendEmail = require("../utils/sendEmail");

const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const exists = await Subscriber.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Already subscribed",
      });
    }

    const subscriber = await Subscriber.create({ email });

    // clean email template
    await sendEmail({
      to: "mohsinkhan292003@gmail.com", // admin email
      subject: "🆕 New Newsletter Subscription",
      html: `
        <div style="font-family:Arial;">
          <h2>New Subscriber 🚀</h2>
          <p><b>Email:</b> ${email}</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "Subscribed successfully",
      subscriber,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribeNewsletter };