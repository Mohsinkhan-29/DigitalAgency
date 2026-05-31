const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");


const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contactRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();


app.set("trust proxy", 1); // fix rate limiter
app.use(express.json());



app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        "https://digitalagency-pmrq.onrender.com",
        "https://digital-agency-dun.vercel.app",
      ];
      // allow requests with no origin (Postman, curl, etc.)
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight explicitly
app.options(/.*/, cors());

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

app.get("/api/contact", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/subscribe", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;