const express = require("express");

const router = express.Router();

router.get("/all", (req, res) => {
  res.send([2, 3, 4]);
});

module.exports = router;
