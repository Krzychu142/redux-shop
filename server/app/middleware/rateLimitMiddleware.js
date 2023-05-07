const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skipSuccessfulRequests: true,
  message: "Too many requests from this IP, please try again in 15 minutes",
});

module.exports = { authLimiter };
