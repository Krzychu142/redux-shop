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

// TODO: two endpoints: one for change password and one for reset password
// to change password, user must put in current password and new password
// to reset password, user must put in email, then we will send an email with a link to reset password - on the link, user will put in new password

module.exports = { registerValidation, loginValidation };
