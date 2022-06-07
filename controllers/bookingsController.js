const { generateError } = require("../lib");
const {
  findAllBookings,
  findOneBooking,
  createBooking,
  updateBooking,
  removeBooking,
} = require("../repositories/bookingsRepository");
const {
  BOOKING_NOT_FOUND,
  BOOKING_NOT_FOUND_BY_ID,
  BOOKING_NOT_CREATED,
  BOOKING_NOT_UPDATED,
  BOOKING_NOT_DELETED,
  BOOKING_CREATED,
  BOOKING_UPDATED,
  BOOKING_DELETED,
} = require("../messages/messages.json");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllBookings();

    if (data.length === 0) {
      generateError(BOOKING_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const data = await findOneBooking(req.params.id);

    if (!data) {
      generateError(BOOKING_NOT_FOUND_BY_ID, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const insertId = await createBooking(req.body);

    if (!insertId) {
      generateError(BOOKING_NOT_CREATED, 500);
    }

    const data = await findOneBooking(insertId);

    res.json({ message: BOOKING_CREATED, data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const affectedRows = await updateBooking(req.body, req.params.id);

    if (!affectedRows) {
      generateError(BOOKING_NOT_UPDATED, 500);
    }

    res.json({ message: BOOKING_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeBooking(req.params.id);

    if (!affectedRows) {
      generateError(BOOKING_NOT_DELETED, 500);
    }

    res.json({ message: BOOKING_DELETED });
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
