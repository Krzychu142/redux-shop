require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/products");
const userRoutes = require("./routes/user");
const { createConnection } = require("./db/connection");

const app = express();
createConnection();

app.use(cors());
app.use(express.json());
app.use("/products", productsRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
