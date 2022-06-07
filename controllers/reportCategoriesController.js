const { generateError } = require("../lib");
const {
  findAllReportCategories,
  findOneReportCategory,
  createReportCategory,
  updateReportCategory,
  removeReportCategory,
} = require("../repositories/reportCategoriesRepository");
const {
  REPORT_CATEGORY_NOT_FOUND,
  REPORT_CATEGORY_NOT_CREATED,
  REPORT_CATEGORY_NOT_UPDATED,
  REPORT_CATEGORY_NOT_DELETED,
  REPORT_CATEGORY_CREATED,
  REPORT_CATEGORY_UPDATED,
  REPORT_CATEGORY_DELETED,
} = require("../messages/messages.json");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllReportCategories();

    if (data.length === 0) {
      generateError(REPORT_CATEGORY_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const insertId = await createReportCategory(req.body);

    if (!insertId) {
      generateError(REPORT_CATEGORY_NOT_CREATED, 500);
    }

    const data = await findOneReportCategory(insertId);

    res.json({ REPORT_CATEGORY_CREATED, data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const affectedRows = await updateReportCategory(req.body, req.params.id);

    if (!affectedRows) {
      generateError(REPORT_CATEGORY_NOT_UPDATED, 500);
    }

    res.json({ REPORT_CATEGORY_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeReportCategory(req.params.id);

    if (!affectedRows) {
      generateError(REPORT_CATEGORY_NOT_DELETED, 500);
    }

    res.json({ REPORT_CATEGORY_DELETED });
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
