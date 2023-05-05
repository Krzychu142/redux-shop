const jswt = require("jsonwebtoken");

const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  const token = jswt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    secretKey,
    { expiresIn: "1h" }
  );

  return token;
};

module.exports = { generateToken };
