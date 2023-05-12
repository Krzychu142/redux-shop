const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skipSuccessfulRequests: true,
  message: "Too many requests from this IP, please try again in 15 minutes",
});

const passwordResetEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  skipSuccessfulRequests: false,
  message: "Too many requests from this IP, please try again in 15 minutes",
});

module.exports = { authLimiter, passwordResetEmailLimiter };
