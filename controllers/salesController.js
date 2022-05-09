const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  return res.status(200).json(sales);
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const sale = await salesService.getById(id);

  if (sale.length === 0) {
    return next({ status: 404, message: 'Sale not found' });
  }

  return res.status(200).json(sale);
};

module.exports = {
  getAll,
  getById,
};