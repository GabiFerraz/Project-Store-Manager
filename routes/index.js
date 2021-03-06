const router = require('express').Router();

const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');
const prodMiddlewares = require('../middlewares/productsMiddlewares');
const salesMiddlewares = require('../middlewares/salesMiddlewares');

router.get('/products', productsController.getAll);

router.get('/products/:id', productsController.getById);

router.get('/sales', salesController.getAll);

router.get('/sales/:id', salesController.getById);

router.post('/products',
prodMiddlewares.nameProductValidate, prodMiddlewares.quantityProductsValidate,
productsController.createProduct);

router.post('/sales', salesMiddlewares.salesValidate, salesController.createSale);

router.put('/products/:id',
prodMiddlewares.nameProductValidate, prodMiddlewares.quantityProductsValidate,
productsController.updateProduct);

router.put('/sales/:id', salesMiddlewares.salesValidate, salesController.updateSale);

router.delete('/products/:id', productsController.deleteProduct);

router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;