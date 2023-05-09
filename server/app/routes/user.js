const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
  sendResetPasswordEmail,
} = require("../business/user.manager");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/register", (req, res) => {
  registerValidation(req.body).then((result) => {
    res
      .status(result.status)
      .send(
        result.token ? { token: result.token } : { message: result.message }
      );
  });
});

router.post("/login", (req, res) => {
  loginValidation(req.body).then((result) => {
    res
      .status(result.status)
      .send(
        result.token ? { token: result.token } : { message: result.message }
      );
  });
});

router.post("/send-reset-password-email", verifyToken, sendResetPasswordEmail);

module.exports = router;
