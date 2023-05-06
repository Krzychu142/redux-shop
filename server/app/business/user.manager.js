const Joi = require("joi");
const User = require("../db/models/user.model");
const { hashPassword, unHashPassword } = require("../middleware/crypt");
const { generateToken } = require("../middleware/jwtGenerator");

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
    return { status: 400, message: "Email already exists" };
  }

  user = new User({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  user.password = await hashPassword(user.password);
  user = await user.save();

  return {
    status: 301,
    message: "User created successfully",
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
    status: 301,
    message: "User logged in successfully",
    token: generateToken(user),
  };
};

module.exports = { registerValidation, loginValidation };