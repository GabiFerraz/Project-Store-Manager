const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  return product;
};

const createProduct = async (name, quantity) => {
  const verifyNameProduct = await productsModel.getByName(name);

  const erro = { status: 409, message: 'Product already exists' };

  if (verifyNameProduct) throw erro;

  const registeredProduct = await productsModel.createProduct(name, quantity);

  return registeredProduct;
};

module.exports = {
  getAll,
  getById,
  createProduct,
};