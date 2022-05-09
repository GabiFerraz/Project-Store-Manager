const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [products] = await connection.execute(query);

  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [product] = await connection.execute(query, [id]);

  return product[0];
};

const getByName = async (name) => {
  const query = 'SELECT name FROM StoreManager.products WHERE name = ?';

  const [product] = await connection.execute(query, [name]);

  return product[0];
};

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';

  const [data] = await connection.execute(query, [name, quantity]);

  const product = {
    id: data.insertId,
    name,
    quantity,
  };

  return product;
};

module.exports = {
  getAll,
  getById,
  getByName,
  createProduct,
};