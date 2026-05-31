const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contactRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://digitalagency-pmrq.onrender.com",
      "https://digital-agency-dun.vercel.app",
    ],
    credentials: true,
  })
);

app.use(helmet());

const newsletterRoutes = require("./routes/newsletterRoutes");

app.use("/api", newsletterRoutes);


const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 5,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use("/api/contact", contactLimiter);

app.use("/api", contactRoutes);

app.use(errorHandler);

module.exports = app;