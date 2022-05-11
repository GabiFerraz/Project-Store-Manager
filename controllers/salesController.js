const salesService = require('../services/salesService');

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesService.getAll();
  
    return res.status(200).json(sales);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    const sale = await salesService.getById(id);
  
    return res.status(200).json(sale);
  } catch (error) {
    return next(error);
  }
};

const createSale = async (req, res, next) => {
  try {
    const data = req.body;

    const sale = await salesService.createSale(data);

    return res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  createSale,
};