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

  const newSalePromise = data.map(({ productId, quantity }) =>
    salesModel.createSaleProducts(saleId, productId, quantity));

  await Promise.all(newSalePromise);

  const saleRegister = {
    id: saleId,
    itemsSold: data,
  };

  return saleRegister;
};

const updateSale = async (saleId, data) => {
  const updateSalePromise = data.map(({ productId, quantity }) =>
    salesModel.updateSale(saleId, productId, quantity));

  await Promise.all(updateSalePromise);

  const saleUpdateRegister = {
    saleId,
    itemUpdated: data,
  };

  return saleUpdateRegister;
};

const deleteSale = async (id) => {
  await getById(id);

  await salesModel.deleteSale(id);

  // não terá retorno, já que não é pra ter nada no body.
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};