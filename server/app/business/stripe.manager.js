const Stripe = require("stripe");
const Order = require("../db/models/order.model");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { transporter } = require("../middleware/nodemailerConfig");

// to run it in the local environment, you need to in termianl:
// stripe login
// stripe listen --forward-to localhost:YOUR_PORT/stripe/webhook
// you can check it by: stripe trigger payment_intent.succeeded

const createOrder = async (customer, data) => {
  const items = JSON.parse(customer.metadata.cart);

  const newOrder = new Order({
    email: customer.email,
    customerId: data.id,
    paymentIntentId: data.payment_intent,
    products: items,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    await newOrder.save();

    const mailOptions = {
      from: "Online shop <" + process.env.EMAIL_ADRESS + ">",
      to: customer.email,
      subject: "Order confirmation",
      html: `<h1>Thank you for your order!</h1>
      <p>Order ID: ${newOrder._id}</p>
      <p>Order total: $${newOrder.total / 100}</p>
      <p>Order status: ${newOrder.payment_status}</p>
      <p>Order details: ${newOrder.products}</p>
      <p>Shipping address: ${newOrder.shipping.address.line1}, ${
        newOrder.shipping.address.city
      }, ${newOrder.shipping.address.state}, ${
        newOrder.shipping.address.postal_code
      }, ${newOrder.shipping.address.country}</p>
      <p>Shipping method: ${newOrder.shipping.carrier}</p>
      <p>Shipping status: ${newOrder.delivery_status}</p>
      <p>Thank you for shopping with us!</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    // send email to the customer
  } catch (err) {
    console.error("Error while adding order to the database:", err);
  }
};

const createCheckoutSession = async (res, req, data) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.userId,
      cart: JSON.stringify(req.cartItems),
    },
  });

  const items = req.cartItems;
  const line_items = items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.desc,
          metadata: {
            productId: item._id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.cartQuantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "PL"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "usd",
          },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items: line_items,
    customer: customer.id,
    mode: "payment",
    // success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout-failure`,
  });
  res.send({ url: session.url });
};

const handleWebhook = (req, res) => {
  const payload = req.body;
  const payloadString = JSON.stringify(payload, null, 2);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: process.env.STRIPE_ENDPOINT_SECRET,
  });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      process.env.STRIPE_ENDPOINT_SECRET
    );
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    stripe.customers
      .retrieve(event.data.object.customer)
      .then((customer) => {
        createOrder(customer, event.data.object);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  res.send();
};

module.exports = { createCheckoutSession, handleWebhook };
