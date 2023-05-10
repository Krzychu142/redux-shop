const express = require("express");
const router = express.Router();
const { getAllProducts, addProduct } = require("../business/product.manager");

router.get("/all", getAllProducts);
router.post("/add-product", addProduct);

module.exports = router;
