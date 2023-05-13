const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../business/stripe.manager");

router.post("/create-checkout-session", async (req, res, next) => {
	try {
		await createCheckoutSession(res, req.body);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
