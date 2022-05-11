const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();

  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  const erro = { status: 404, message: 'Product not found' };

  if (product === undefined) throw erro;

  return product;
};

const createProduct = async (name, quantity) => {
  const verifyNameProduct = await productsModel.getByName(name);

  const erro = { status: 409, message: 'Product already exists' };

  if (verifyNameProduct) throw erro;

  const registeredProduct = await productsModel.createProduct(name, quantity);

  return registeredProduct;
};

const updateProduct = async (id, name, quantity) => {
  await getById(id);

  const product = await productsModel.updateProduct(id, name, quantity);

  return product;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
};