const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const getById = async (productId) => {
  const sale = await salesModel.getById(productId);

  const erro = { status: 404, message: 'Sale not found' };

  if (sale.length === 0) throw erro;

  return sale;
};

module.exports = {
  getAll,
  getById,
};