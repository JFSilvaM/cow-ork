const { generateError } = require("../lib");
const {
  findAllSpaces,
  findOneSpace,
  createSpace,
  updateSpace,
  removeSpace,
} = require("../repositories/spacesRepository");
const {
  SPACE_NOT_FOUND,
  SPACE_NOT_FOUND_BY_ID,
  SPACE_NOT_CREATED,
  SPACE_NOT_UPDATED,
  SPACE_NOT_DELETED,
  SPACE_CREATED,
  SPACE_UPDATED,
  SPACE_DELETED,
} = require("../messages/messages.json");
const { spaceValidation } = require("../validations");
const { uploadFile } = require("../lib/uploadFile");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllSpaces(req.query);

    if (data.length === 0) {
      generateError(SPACE_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const data = await findOneSpace(req.params.id);

    if (!data) {
      generateError(SPACE_NOT_FOUND_BY_ID, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const value = await spaceValidation(req.body);

    if (req.files) {
      const fileName = await uploadFile(
        req.files.space_image,
        req.auth.id,
        "spaces"
      );

      value.image = fileName;
    }

    const insertId = await createSpace(value);

    if (!insertId) {
      generateError(SPACE_NOT_CREATED, 500);
    }

    res.json({ message: SPACE_CREATED, data: value });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const value = await spaceValidation(req.body);

    if (req.files) {
      const fileName = await uploadFile(
        req.files.space_image,
        req.auth.id,
        "spaces"
      );

      value.image = fileName;
    }

    const affectedRows = await updateSpace(value, req.params.id);

    if (!affectedRows) {
      generateError(SPACE_NOT_UPDATED, 500);
    }

    res.json({ message: SPACE_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeSpace(req.params.id);

    if (!affectedRows) {
      generateError(SPACE_NOT_DELETED, 500);
    }

    res.json({ message: SPACE_DELETED });
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
