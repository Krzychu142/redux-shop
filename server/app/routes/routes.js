const express = require("express");
const router = express.Router();

const productsRoutes = require("./products");
const userRoutes = require("./user");
const stripeRoutes = require("./stripe");

router.use("/products", productsRoutes);
router.use("/user", userRoutes);
router.use("/stripe", stripeRoutes);

module.exports = router;
