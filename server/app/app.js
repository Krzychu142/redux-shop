const express = require("express");
const cors = require("cors");
const config = require("./config");
const productsRoutes = require("./routes/products");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", productsRoutes);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
