const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  handleWebhook,
} = require("../business/stripe.manager");

router.post("/create-checkout-session", async (req, res, next) => {
  try {
    await createCheckoutSession(res, req.body);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res, next) => {
    try {
      handleWebhook(req, res, next);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
