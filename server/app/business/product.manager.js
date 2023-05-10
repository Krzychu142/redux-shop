const Product = require("../db/models/product.model");
const Joi = require("joi");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error while fetching products from the database:", err);
    res
      .status(500)
      .json({ message: "Error while fetching products from the database" });
  }
};

const productSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().min(3).max(100).required(),
  desc: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
});

const addProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error while adding product to the database:", err);
    res
      .status(500)
      .json({ message: "Error while adding product to the database" });
  }
};

module.exports = { getAllProducts, addProduct };
