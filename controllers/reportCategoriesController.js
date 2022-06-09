const { generateError } = require("../lib");
const {
  findAllReportCategories,
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
const { reportCategoryValidation } = require("../validations");

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
    const { error, value } = reportCategoryValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const insertId = await createReportCategory(value);

    if (!insertId) {
      generateError(REPORT_CATEGORY_NOT_CREATED, 500);
    }

    res.json({ REPORT_CATEGORY_CREATED, data: value });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error, value } = reportCategoryValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const affectedRows = await updateReportCategory(value, req.params.id);

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
