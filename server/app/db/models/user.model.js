const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
  passwordResetToken: { type: String, default: null },
  passwordResetExpires: { type: Date, default: null },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
