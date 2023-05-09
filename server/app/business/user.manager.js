const Joi = require("joi");
const User = require("../db/models/user.model");
const { hashPassword, unHashPassword } = require("../middleware/crypt");
const { generateToken } = require("../middleware/jwtGenerator");
const { transporter } = require("../middleware/nodemailerConfig");

const registerValidation = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return { status: 400, message: error.details[0].message };
  }

  let user = await User.findOne({ email: data.email });
  if (user) {
    return { status: 400, message: "User already exists" };
  }

  user = new User({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  user.password = await hashPassword(user.password);
  user = await user.save();

  return {
    status: 200,
    token: generateToken(user),
  };
};

const loginValidation = async (data) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return { status: 400, message: error.details[0].message };
  }

  let user = await User.findOne({ email: data.email });
  if (!user) {
    return { status: 400, message: "Invalid email or password" };
  }

  const validPassword = await unHashPassword(data.password, user.password);
  if (!validPassword) {
    return { status: 400, message: "Invalid email or password" };
  }

  return {
    status: 200,
    token: generateToken(user),
  };
};

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const token = generateToken(user, true);

    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000;
    await user.save();

    const resetPasswordUrl = `http://localhost:3000/reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_ADRESS,
      to: email,
      subject: "Password Reset",
      text: `You have requested a password reset. Please click the following link to reset your password: ${resetPasswordUrl}`,
      html: `<p>You have requested a password reset. Please click the following link to reset your password: <a href="${resetPasswordUrl}">${resetPasswordUrl}</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Reset password email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  registerValidation,
  loginValidation,
  sendResetPasswordEmail,
};
