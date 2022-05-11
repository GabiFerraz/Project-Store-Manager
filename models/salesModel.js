const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS sa
  ON sp.sale_id = sa.id`;

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (productId) => {
  const query = `SELECT sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales AS sa
  INNER JOIN StoreManager.sales_products AS sp
  ON sa.id = sp.sale_id
  WHERE id = ?`;

  const [sale] = await connection.execute(query, [productId]);

  return sale;
};

const createSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  
  const [{ insertId }] = await connection.execute(query);
  
  return insertId;
};

const createSaleProducts = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?)`;

  const [sale] = await connection.execute(query, [saleId, productId, quantity]);

  return sale;
};

module.exports = {
  getAll,
  getById,
  createSale,
  createSaleProducts,
};