const quantityProducts = require('../utils/quantityProducts');

const salesValidate = (req, _res, next) => {
  const data = req.body;

  data.forEach(({ productId, quantity }) => {
    const { error } = quantityProducts.validate({ quantity });
    
    if (productId === undefined) {
      return next({ status: 400, message: '"productId" is required' });
    }
    if (quantity === undefined) {
      return next({ status: 400, message: '"quantity" is required' });
    }
  
    if (error) {
      return next({ status: 422, message: '"quantity" must be greater than or equal to 1' });
    }
  });

  next();
};

module.exports = {
  salesValidate,
};