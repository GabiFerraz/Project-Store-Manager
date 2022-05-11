const salesModel = require('../models/salesModel');

const serializeAll = (data) => ({
  saleId: data.sale_id,
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales.map(serializeAll);
};

const serializeId = (data) => ({
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getById = async (saleId) => {
  const sale = await salesModel.getById(saleId);

  const erro = { status: 404, message: 'Sale not found' };

  if (sale.length === 0) throw erro;

  return sale.map(serializeId);
};

const createSale = async (data) => {
  const saleId = await salesModel.createSale(data);

  const newSalePromisse = data.map(({ productId, quantity }) =>
    salesModel.createSaleProducts(saleId, productId, quantity));

  await Promise.all(newSalePromisse);

  const saleRegister = {
    id: saleId,
    itemsSold: data,
  };

  return saleRegister;
};

module.exports = {
  getAll,
  getById,
  createSale,
};