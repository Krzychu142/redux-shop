const jwt = require("jsonwebtoken");

const generateToken = (user, isPasswordResetToken = false) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const payload = isPasswordResetToken
    ? { _id: user._id }
    : {
        _id: user._id,
        name: user.name,
        email: user.email,
      };
  const expiresIn = "1h";

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

module.exports = { generateToken };
