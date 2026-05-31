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

    // send welcome email
    await sendEmail({
      to: email,
      subject: "Welcome to Digital Agency",
      html: `<h2>Thanks for subscribing!</h2><p>You will get weekly updates.</p>`,
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