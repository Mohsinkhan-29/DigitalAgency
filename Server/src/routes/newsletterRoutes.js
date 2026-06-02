const express = require("express");
const router = express.Router();

const {
  subscribeNewsletter,
} = require("../controllers/newsletterController");

router.post("/subscribe", subscribeNewsletter);

console.log("Email API hit");

module.exports = router;