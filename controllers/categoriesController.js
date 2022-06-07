const { generateError } = require("../lib");
const {
  findAllCategories,
  findOneCategory,
  createCategory,
  updateCategory,
  removeCategory,
} = require("../repositories/categoriesRepository");
const {
  CATEGORY_NOT_FOUND,
  CATEGORY_NOT_CREATED,
  CATEGORY_NOT_UPDATED,
  CATEGORY_NOT_DELETED,
  CATEGORY_CREATED,
  CATEGORY_UPDATED,
  CATEGORY_DELETED,
} = require("../messages/messages.json");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllCategories();

    if (data.length === 0) {
      generateError(CATEGORY_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const insertId = await createCategory(req.body);

    if (!insertId) {
      generateError(CATEGORY_NOT_CREATED, 500);
    }

    const data = await findOneCategory(insertId);

    res.json({ CATEGORY_CREATED, data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const affectedRows = await updateCategory(req.body, req.params.id);

    if (!affectedRows) {
      generateError(CATEGORY_NOT_UPDATED, 500);
    }

    res.json({ CATEGORY_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeCategory(req.params.id);

    if (!affectedRows) {
      generateError(CATEGORY_NOT_DELETED, 500);
    }

    res.json({ CATEGORY_DELETED });
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
