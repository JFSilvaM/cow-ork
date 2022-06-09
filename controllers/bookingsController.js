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
const { bookingValidation } = require("../validations");
const sendMail = require("../lib/sendMail");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllBookings(req.auth.id);

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
    const data = await findOneBooking(req.params.id, req.auth.id);

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
    const { error, value } = bookingValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const insertId = await createBooking(value, req.auth.id);

    if (!insertId) {
      generateError(BOOKING_NOT_CREATED, 500);
    }

    const data = await findOneBooking(insertId, req.auth.id);

    await sendMail(BOOKING_CREATED, templateContent(data), "booking");

    res.json({ message: BOOKING_CREATED, data: value });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error, value } = bookingValidation(req.body);

    if (error) {
      generateError(error.details[0].message, 400);
    }

    const affectedRows = await updateBooking(value, req.params.id, req.auth.id);

    if (!affectedRows) {
      generateError(BOOKING_NOT_UPDATED, 500);
    }

    const data = await findOneBooking(req.params.id, req.auth.id);

    await sendMail(BOOKING_UPDATED, templateContent(data), "booking");

    res.json({ message: BOOKING_UPDATED });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeBooking(req.params.id, req.auth.id);

    if (!affectedRows) {
      generateError(BOOKING_NOT_DELETED, 500);
    }

    res.json({ message: BOOKING_DELETED });
  } catch (error) {
    next(error);
  }
};

const templateContent = (data) => ({
  fullName: data.first_name + " " + data.last_name,
  email: data.email,
  spaceName: data.name,
  spaceAddress: data.address,
  price: data.price,
  startDate: new Date(data.start_date).toLocaleString(),
  endDate: new Date(data.end_date).toLocaleString(),
});

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
