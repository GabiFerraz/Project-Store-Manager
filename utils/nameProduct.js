const Joi = require('joi');

const nameProducts = Joi.object({
  name: Joi.string()
    .min(5)
    .required(),
});

module.exports = nameProducts;