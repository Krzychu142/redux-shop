const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../business/stripe.manager");

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
