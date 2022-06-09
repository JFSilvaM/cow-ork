const { generateError } = require("../lib");
const {
  findAllSpaceTypes,
  createSpaceType,
  updateSpaceType,
  removeSpaceType,
} = require("../repositories/spaceTypesRepository");
const {
  SPACE_TYPE_NOT_FOUND,
  SPACE_TYPE_NOT_CREATED,
  SPACE_TYPE_NOT_UPDATED,
  SPACE_TYPE_NOT_DELETED,
  SPACE_TYPE_CREATED,
  SPACE_TYPE_UPDATED,
  SPACE_TYPE_DELETED,
} = require("../messages/messages.json");
const { spaceTypeValidation } = require("../validations");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllSpaceTypes();

    if (data.length === 0) {
      generateError(SPACE_TYPE_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { error, value } = spaceTypeValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const insertId = await createSpaceType(value);

    if (!insertId) {
      generateError(SPACE_TYPE_NOT_CREATED, 500);
    }

    res.json({ SPACE_TYPE_CREATED, data: value });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error, value } = spaceTypeValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const affectedRows = await updateSpaceType(value, req.params.id);

    if (!affectedRows) {
      generateError(SPACE_TYPE_NOT_UPDATED, 500);
    }

    res.json({ SPACE_TYPE_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeSpaceType(req.params.id);

    if (!affectedRows) {
      generateError(SPACE_TYPE_NOT_DELETED, 500);
    }

    res.json({ SPACE_TYPE_DELETED });
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
