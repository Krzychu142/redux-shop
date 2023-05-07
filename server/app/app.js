require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const { createConnection } = require("./db/connection");

const app = express();
createConnection();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
