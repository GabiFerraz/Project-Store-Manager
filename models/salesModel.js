const connection = require('./connection');

const serializeAll = (data) => ({
  saleId: data.sale_id,
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getAll = async () => {
  const query = `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa
  ON sp.sale_id = sa.id`;

  const [sales] = await connection.execute(query);

  return sales.map(serializeAll);
};

const serializeId = (data) => ({
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getById = async (productId) => {
  const query = `SELECT sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales AS sa
  INNER JOIN StoreManager.sales_products AS sp
  ON sa.id = sp.sale_id
  WHERE id = ?`;

  const [sale] = await connection.execute(query, [productId]);
  // console.log(sale);

  return sale.map(serializeId);
};

module.exports = {
  getAll,
  getById,
};