const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();

  return res.status(200).json(products);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const product = await productsService.getById(id);

  if (product === undefined) {
    return next({ status: 404, message: 'Product not found' });
  }

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getById,
};