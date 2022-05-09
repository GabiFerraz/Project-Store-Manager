const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (productId) => {
  const sale = await salesModel.getById(productId);

  return sale;
};

module.exports = {
  getAll,
  getById,
};