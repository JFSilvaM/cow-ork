const { generateError } = require("../lib");
const {
  findOneSpaceRating,
  updateSpaceRating,
} = require("../repositories/spaceRatingsRepository");
const {
  RATING_NOT_FOUND,
  RATING_UPDATED,
  RATING_NOT_UPDATED,
  RATING_NOT_ALLOWED,
} = require("../messages/messages.json");
const { spaceRatingValidation } = require("../validations");
const { findBookingDates } = require("../repositories/bookingsRepository");

const findOne = async (req, res, next) => {
  try {
    const data = await findOneSpaceRating(req.params.id);

    if (!data) {
      generateError(RATING_NOT_FOUND, 404);
    }

    res.json({ data });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const value = await spaceRatingValidation(req.body);

    const date = await findBookingDates(value.space_id, req.auth.id);

    if (!date || new Date(date.end_date).getTime() > Date.now()) {
      generateError(RATING_NOT_ALLOWED, 500);
    }

    const affectedRows = await updateSpaceRating(value, req.auth.id);

    if (affectedRows === 0) {
      generateError(RATING_NOT_UPDATED, 500);
    }

    res.json({ data: { status: "ok", message: RATING_UPDATED } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findOne,
  update,
};
