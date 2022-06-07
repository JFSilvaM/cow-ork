const Joi = require("joi");

const bookingValidation = {};

const reportCategoryValidation = {};

const reportValidation = {};

const serviceValidation = {};

const spaceValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(3).max(250).required(),
    address: Joi.string().min(3).max(100).required(),
    price: Joi.number().min(1).max(1000).required(),
    capacity: Joi.number().min(1).required(),
    is_clean: Joi.number().required().valid(0, 1),
    type_id: Joi.number().min(1).required(),
  });

  return schema.validate(body);
};

const spaceTypeValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  });

  return schema.validate(body);
};

const userValidation = (body) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(100).required(),
    last_name: Joi.string().min(3).max(100).required(),
    email: Joi.string().min(3).max(100).email().required(),
    password: Joi.number().min(6).max(36).required(),
    password_confirmation: Joi.number().valid(Joi.ref("password")).required(),
  });

  return schema.validate(body);
};

module.exports = {
  bookingValidation,
  reportCategoryValidation,
  reportValidation,
  serviceValidation,
  spaceValidation,
  spaceTypeValidation,
  userValidation,
};
