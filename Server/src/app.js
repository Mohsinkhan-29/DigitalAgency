const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactRoutes = require("./routes/contactRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.set("trust proxy", 1);

// ── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "https://digital-agency-dun.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions)); // preflight for all routes

// ── CORE MIDDLEWARE ──────────────────────────────────────────────────────────
app.use(helmet());
app.use(express.json());

// ── RATE LIMITING ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use("/api/contact", contactLimiter);

// ── ROUTES ───────────────────────────────────────────────────────────────────
app.use("/api", newsletterRoutes);
app.use("/api", contactRoutes);

// ── HEALTH CHECKS ────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ── ERROR HANDLER (must be last) ─────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;