const nameProduct = require('../utils/nameProduct');
const quantityProducts = require('../utils/quantityProducts');

const nameProductValidate = (req, _res, next) => {
  const { name } = req.body;

  const { error } = nameProduct.validate({ name });

  if (name === undefined) {
    return next({ status: 400, message: '"name" is required' });
  }

  if (error) {
    return next({ status: 422, message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const quantityProductsValidate = (req, _res, next) => {
  const { quantity } = req.body;

  const { error } = quantityProducts.validate({ quantity });

  if (quantity === undefined) {
    return next({ status: 400, message: '"quantity" is required' });
  }

  if (error) {
    return next({ status: 422, message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

// const productIdValidate = (req, _res, next) => {
//   const data = req.body;
//   console.log(data);

//   data.forEach(({ productId, quantity }) => {
//     const { error } = quantityProducts.validate({ quantity });
//     if (productId === undefined) {
//       return next({ status: 400, message: '"productId" is required' });
//     }
//     if (quantity === undefined) {
//       return next({ status: 400, message: '"quantity" is required' });
//     }
  
//     if (error) {
//       return next({ status: 422, message: '"quantity" must be greater than or equal to 1' });
//     }
//   });

//   next();
// };

module.exports = {
  nameProductValidate,
  quantityProductsValidate,
  // productIdValidate,
};