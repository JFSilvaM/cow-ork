const { generateError } = require("../lib");
const {
  findAllReports,
  findOneReport,
  createReport,
  updateReport,
  removeReport,
} = require("../repositories/reportsRepository");
const {
  REPORT_NOT_FOUND,
  REPORT_NOT_FOUND_BY_ID,
  REPORT_NOT_CREATED,
  REPORT_NOT_UPDATED,
  REPORT_NOT_DELETED,
  REPORT_CREATED,
  REPORT_UPDATED,
  REPORT_DELETED,
} = require("../messages/messages.json");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllReports();

    if (data.length === 0) {
      generateError(REPORT_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const data = await findOneReport(req.params.id);

    if (!data) {
      generateError(REPORT_NOT_FOUND_BY_ID, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const insertId = await createReport(req.body);

    if (!insertId) {
      generateError(REPORT_NOT_CREATED, 500);
    }

    const data = await findOneReport(insertId);

    res.json({ message: REPORT_CREATED, data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const affectedRows = await updateReport(req.body, req.params.id);

    if (affectedRows === 0) {
      generateError(REPORT_NOT_UPDATED, 500);
    }

    res.json({ message: REPORT_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeReport(req.params.id);

    if (affectedRows === 0) {
      generateError(REPORT_NOT_DELETED, 500);
    }

    res.json({ message: REPORT_DELETED });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
