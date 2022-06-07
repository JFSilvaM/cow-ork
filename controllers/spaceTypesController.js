const { generateError } = require("../lib");
const {
  findAllSpaceTypes,
  findOneSpaceType,
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
    // TODO: Se necesita validar los datos
    const insertId = await createSpaceType(req.body);

    if (!insertId) {
      generateError(SPACE_TYPE_NOT_CREATED, 500);
    }

    const data = await findOneSpaceType(insertId);

    res.json({ SPACE_TYPE_CREATED, data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const affectedRows = await updateSpaceType(req.body, req.params.id);

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
