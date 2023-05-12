const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
  sendResetPasswordEmail,
  changePasswordValidation,
  resetPassword,
} = require("../business/user.manager");
const { verifyToken } = require("../middleware/verifyToken");
const {
  authLimiter,
  passwordResetEmailLimiter,
} = require("../middleware/rateLimitMiddleware");

router.post("/register", authLimiter, (req, res) => {
  registerValidation(req.body).then((result) => {
    res
      .status(result.status)
      .send(
        result.token ? { token: result.token } : { message: result.message }
      );
  });
});

router.post("/login", authLimiter, (req, res) => {
  loginValidation(req.body).then((result) => {
    res
      .status(result.status)
      .send(
        result.token ? { token: result.token } : { message: result.message }
      );
  });
});

router.post(
  "/send-reset-password-email",
  passwordResetEmailLimiter,
  sendResetPasswordEmail
);

router.post("/change-password", verifyToken, authLimiter, async (req, res) => {
  const result = await changePasswordValidation(req);

  res.status(result.status).json({ message: result.message });
});

router.post("/reset-password", authLimiter, resetPassword);

module.exports = router;
