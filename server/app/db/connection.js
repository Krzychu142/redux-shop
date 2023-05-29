const mongoose = require("mongoose");

// singleton
let connectionEstablished = false;

const createConnection = async () => {
  if (connectionEstablished) {
    console.log("Database connection has already been established.");
    return;
  }

  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
    connectionEstablished = true;
  } catch (err) {
    console.log("Cannot connect to the database", err);
    process.exit();
  }
};

module.exports = { createConnection };
