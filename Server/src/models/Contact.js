const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    company: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    services: [String],

    timeline: String,

    budget: Number,

    details: String,

    howFound: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);