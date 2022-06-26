const { ValidationError } = require("joi");

const handleError = (error, req, res, next) => {
  console.error(error);

  if (error instanceof ValidationError) {
    error.statusCode = 400;
  }

  res.statusCode = error.statusCode || 500;
  res.send({ status: "error", message: error.message });
};

module.exports = handleError;
