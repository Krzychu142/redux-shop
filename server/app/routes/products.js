const express = require("express");
const router = express.Router();

const allProducts = require("../db/productsDAO");

router.get("/all", (req, res) => {
  res.send(allProducts);
});

module.exports = router;
