const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendContactEmail");

const submitContact = async (req, res, next) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      services,
      timeline,
      budget,
      details,
      howFound,
    } = req.body;

    // Save in DB
    const contact = await Contact.create({
      name,
      email,
      company,
      phone,
      services,
      timeline,
      budget,
      details,
      howFound,
    });

    // 🔥 EMAIL TO ADMIN
    await sendEmail({
      subject: `📩 New Contact Form Submission - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Company:</b> ${company || "N/A"}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Services:</b> ${services.join(", ")}</p>
        <p><b>Timeline:</b> ${timeline}</p>
        <p><b>Budget:</b> $${budget}</p>

        <p><b>Details:</b></p>
        <p>${details}</p>

        <p><b>How they found us:</b> ${howFound}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      contact,
    });

  } catch (err) {
    console.log(err);
    next(err);
  }
};

// await sendEmail({
//   to: email,
//   subject: "We received your message 🚀",
//   html: `
//     <h2>Thanks for contacting us!</h2>
//     <p>We received your message and will reply within 24 hours.</p>
//   `,
// });

module.exports = { submitContact };