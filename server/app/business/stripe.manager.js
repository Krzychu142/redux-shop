const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (res, req, data) => {
  const items = req.cartItems;
  const line_items = items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.send({ url: session.url });
};

module.exports = { createCheckoutSession };
