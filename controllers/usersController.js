const { generateError } = require("../lib");
const {
  findAllUsers,
  findOneUser,
  updateUser,
  removeUser,
} = require("../repositories/usersRepository");
const {
  USER_NOT_FOUND,
  USER_NOT_FOUND_BY_ID,
  USER_NOT_UPDATED,
  USER_NOT_DELETED,
  USER_UPDATED,
  USER_DELETED,
} = require("../messages/messages.json");
const { userValidation } = require("../validations");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllUsers();

    if (data.length === 0) {
      generateError(USER_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const data = await findOneUser(req.params.id);

    if (!data) {
      generateError(USER_NOT_FOUND_BY_ID, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error, value } = userValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const affectedRows = await updateUser(value, req.auth.id);

    if (!affectedRows) {
      generateError(USER_NOT_UPDATED, 500);
    }

    res.json({ message: USER_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeUser(req.params.id);

    if (!affectedRows) {
      generateError(USER_NOT_DELETED, 500);
    }

    res.json({ message: USER_DELETED });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  update,
  remove,
};
