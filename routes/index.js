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
prodMiddlewares.nameProductValidate, prodMiddlewares.quantityProductsValidate);

router.post('/sales', salesMiddlewares.salesValidate);

router.put('/products/:id',
prodMiddlewares.nameProductValidate, prodMiddlewares.quantityProductsValidate);

router.put('/sales/:id', salesMiddlewares.salesValidate);

module.exports = router;