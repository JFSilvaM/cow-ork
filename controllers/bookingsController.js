const { generateError } = require("../lib");
const {
  findAllBookings,
  findOneBooking,
  createBooking,
  updateBooking,
  removeBooking,
} = require("../repositories/bookingsRepository");

const findAll = async (req, res, next) => {
  try {
    const data = await findAllBookings();

    if (!data) {
      generateError("No se encontraron reservas", 404);
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
      generateError("No se encontró la reserva", 404);
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
      generateError("No se pudo crear la reserva", 500);
    }

    const data = await findOneBooking(insertId);

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    // TODO: Se necesita validar los datos
    const affectedRows = await updateBooking(req.body, req.params.id);

    if (!affectedRows) {
      generateError("No se pudo actualizar la reserva", 500);
    }

    res.json({ affectedRows });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const affectedRows = await removeBooking(req.params.id);

    if (!affectedRows) {
      generateError("No se pudo eliminar la reserva", 500);
    }

    res.json({ affectedRows });
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
