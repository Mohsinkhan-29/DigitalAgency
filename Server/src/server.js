const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
console.log("ENV CHECK:", {
  EMAIL_USER: process.env.EMAIL_USER ? "✅ loaded" : "❌ missing",
  EMAIL_PASS: process.env.EMAIL_PASS ? "✅ loaded" : "❌ missing",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL ? "✅ loaded" : "❌ missing",
});

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});