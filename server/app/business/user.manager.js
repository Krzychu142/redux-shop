const Joi = require("joi");
const User = require("../db/models/user.model");
const { hashPassword, unHashPassword } = require("../middleware/crypt");
const { generateToken } = require("../middleware/jwtGenerator");
const { transporter } = require("../middleware/nodemailerConfig");
const { decode } = require("../middleware/verifyToken");

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

const resetPassword = async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(6).max(200).required(),
    token: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details ? error.details[0].message : "Validation error",
    });
  }

  const { token, password } = req.body;

  try {
    const decoded = decode(token);
    const userId = decoded._id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (Date.now() > user.passwordResetExpires) {
      return res.status(400).json({ message: "Token expired" });
    }

    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const changePasswordValidation = async (req) => {
  const data = req.body;

  const schema = Joi.object({
    currentPassword: Joi.string().min(6).max(200).required(),
    newPassword: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(data);

  if (error) {
    return { status: 400, message: error.details[0].message };
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return { status: 404, message: "User not found" };
  }

  const validPassword = await unHashPassword(
    data.currentPassword,
    user.password
  );

  if (!validPassword) {
    return { status: 400, message: "Invalid current password" };
  }

  user.password = await hashPassword(data.newPassword);
  await user.save();

  return { status: 200, message: "Password changed successfully" };
};

module.exports = {
  registerValidation,
  loginValidation,
  sendResetPasswordEmail,
  changePasswordValidation,
  resetPassword,
};
