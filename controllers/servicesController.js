const { generateError } = require("../lib");
const {
  findAllServices,
  findOneService,
  createService,
  updateService,
  removeService,
} = require("../repositories/servicesRepository");
const {
  SERVICE_NOT_FOUND,
  SERVICE_NOT_CREATED,
  SERVICE_NOT_UPDATED,
  SERVICE_NOT_DELETED,
  SERVICE_CREATED,
  SERVICE_UPDATED,
  SERVICE_DELETED,
} = require("../messages/messages.json");
const { serviceValidation } = require("../validations");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllServices();

    if (data.length === 0) {
      generateError(SERVICE_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { error, value } = serviceValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const insertId = await createService(value);

    if (!insertId) {
      generateError(SERVICE_NOT_CREATED, 500);
    }

    res.json({ SERVICE_CREATED, data: value });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error, value } = serviceValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const affectedRows = await updateService(value, req.params.id);

    if (!affectedRows) {
      generateError(SERVICE_NOT_UPDATED, 500);
    }

    res.json({ SERVICE_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeService(req.params.id);

    if (!affectedRows) {
      generateError(SERVICE_NOT_DELETED, 500);
    }

    res.json({ SERVICE_DELETED });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
