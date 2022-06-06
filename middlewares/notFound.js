const notFound = (req, res, next) => {
  res.status(404).send({ status: "error", message: "Recurso no encontrado" });
};

module.exports = notFound;
