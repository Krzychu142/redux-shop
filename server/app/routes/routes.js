const express = require("express");
const router = express.Router();

const productsRoutes = require("./products");
const userRoutes = require("./user");

router.use("/products", productsRoutes);
router.use("/user", userRoutes);

module.exports = router;
