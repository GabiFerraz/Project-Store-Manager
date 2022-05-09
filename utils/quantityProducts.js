const Joi = require('joi');

const quantityProducts = Joi.object({
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
});

module.exports = quantityProducts;