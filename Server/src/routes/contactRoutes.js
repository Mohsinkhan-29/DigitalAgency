const express = require("express");

const router = express.Router();

const {
  submitContact,
} = require("../controllers/contactController");

const validateContact = require("../middleware/validationMiddleware");

router.post(
  "/contact",
  validateContact,
  submitContact
);
console.log("Contact API hit");

module.exports = router;