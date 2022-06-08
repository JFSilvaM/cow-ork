const Joi = require("joi");
const messages = require("../messages/messages.json");

const bookingValidation = (body) => {
  const schema = Joi.object({
    start_date: Joi.date().required().messages({
      "date.empty": messages.BOOKING_START_DATE_REQUIRED,
    }),
    end_date: Joi.date().required().messages({
      "date.empty": messages.BOOKING_END_DATE_REQUIRED,
    }),
  });

  return schema.validate(body);
};

const reportCategoryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.REPORT_CATEGORY_NAME_REQUIRED,
      "string.min": messages.REPORT_CATEGORY_NAME_MIN_LENGTH,
      "string.max": messages.REPORT_CATEGORY_NAME_MAX_LENGTH,
    }),
  });

  return schema.validate(body);
};

const reportValidation = (body) => {
  const schema = Joi.object({
    description: Joi.string().min(3).max(250).required().messages({
      "string.empty": messages.REPORT_DESCRIPTION_REQUIRED,
      "string.min": messages.REPORT_DESCRIPTION_MIN_LENGTH,
      "string.max": messages.REPORT_DESCRIPTION_MAX_LENGTH,
    }),
    status: Joi.string()
      .valid("PENDING", "OPEN", "CLOSED")
      .required()
      .messages({
        "string.empty": messages.REPORT_STATUS_REQUIRED,
        "string.valid": messages.REPORT_STATUS_VALID,
      }),
  });

  return schema.validate(body);
};

const serviceValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.SERVICE_NAME_REQUIRED,
      "string.min": messages.SERVICE_NAME_MIN_LENGTH,
      "string.max": messages.SERVICE_NAME_MAX_LENGTH,
    }),
  });

  return schema.validate(body);
};

const spaceValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.SPACE_NAME_REQUIRED,
      "string.min": messages.SPACE_NAME_MIN_LENGTH,
      "string.max": messages.SPACE_NAME_MAX_LENGTH,
    }),
    description: Joi.string().min(3).max(250).required().messages({
      "string.empty": messages.SPACE_DESCRIPTION_REQUIRED,
      "string.min": messages.SPACE_DESCRIPTION_MIN_LENGTH,
      "string.max": messages.SPACE_DESCRIPTION_MAX_LENGTH,
    }),
    address: Joi.string().min(3).max(250).required().messages({
      "string.empty": messages.SPACE_ADDRESS_REQUIRED,
      "string.min": messages.SPACE_ADDRESS_MIN_LENGTH,
      "string.max": messages.SPACE_ADDRESS_MAX_LENGTH,
    }),
    price: Joi.number().min(1).max(1000).required().messages({
      "number.empty": messages.SPACE_PRICE_REQUIRED,
      "number.min": messages.SPACE_PRICE_MIN_LENGTH,
      "number.max": messages.SPACE_PRICE_MAX_LENGTH,
    }),
    capacity: Joi.number().min(1).required().messages({
      "number.empty": messages.SPACE_CAPACITY_REQUIRED,
      "number.min": messages.SPACE_CAPACITY_MIN_LENGTH,
    }),
    is_clean: Joi.number().required().valid(0, 1).messages({
      "number.empty": messages.SPACE_IS_CLEAN_REQUIRED,
      "number.valid": messages.SPACE_IS_CLEAN_VALID,
    }),
    type_id: Joi.number().min(1).required().messages({
      "number.empty": messages.SPACE_TYPE_ID_REQUIRED,
      "number.min": messages.SPACE_TYPE_ID_MIN_LENGTH,
    }),
  });

  return schema.validate(body);
};

const spaceTypeValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.SPACE_TYPE_NAME_REQUIRED,
      "string.min": messages.SPACE_TYPE_NAME_MIN_LENGTH,
      "string.max": messages.SPACE_TYPE_NAME_MAX_LENGTH,
    }),
  });

  return schema.validate(body);
};

const userValidation = (body) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.FIRST_NAME_REQUIRED,
      "string.min": messages.FIRST_NAME_MIN_LENGTH,
      "string.max": messages.FIRST_NAME_MAX_LENGTH,
    }),
    last_name: Joi.string().min(3).max(100).required().messages({
      "string.empty": messages.LAST_NAME_REQUIRED,
      "string.min": messages.LAST_NAME_MIN_LENGTH,
      "string.max": messages.LAST_NAME_MAX_LENGTH,
    }),
    email: Joi.string().min(3).max(100).email().required().messages({
      "string.empty": messages.EMAIL_REQUIRED,
      "string.min": messages.EMAIL_MIN_LENGTH,
      "string.max": messages.EMAIL_MAX_LENGTH,
      "string.email": messages.EMAIL_VALID,
    }),
    password: Joi.number().min(6).max(36).required().messages({
      "number.empty": messages.PASSWORD_REQUIRED,
      "number.min": messages.PASSWORD_MIN_LENGTH,
      "number.max": messages.PASSWORD_MAX_LENGTH,
    }),
    password_confirmation: Joi.number()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "number.empty": messages.PASSWORD_CONFIRMATION_REQUIRED,
        "number.valid": messages.PASSWORD_CONFIRMATION_VALID,
      }),
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
