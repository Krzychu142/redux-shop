const mongoose = require("mongoose");

const createConnection = async () => {
  await mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.log("Cannot connect to the database", err);
      process.exit();
    });
};

module.exports = { createConnection };
