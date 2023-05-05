const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
} = require("../business/user.manager");

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

module.exports = router;
