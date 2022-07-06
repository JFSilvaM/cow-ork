const pool = require("../database/getPool")();

const findOneSpaceRating = async (spaceId) => {
  const query =
    "SELECT IFNULL(ROUND(AVG(rating), 0), 0) AS rating FROM space_ratings WHERE space_id = ?";

  const [[row]] = await pool.query(query, [spaceId]);

  return row;
};

const updateSpaceRating = async (spaceRatings, userId) => {
  const queryGetRating =
    "SELECT * FROM space_ratings WHERE space_id = ? AND user_id = ?";
  const queryInsertRating =
    "INSERT INTO space_ratings (space_id, user_id, rating) VALUES (?, ?, ?)";
  const queryUpdateRating =
    "UPDATE space_ratings SET rating = ? WHERE space_id = ? AND user_id = ?";

  const [spaceRating] = await pool.query(queryGetRating, [
    spaceRatings.space_id,
    userId,
  ]);

  if (spaceRating.length === 0) {
    const [{ insertId }] = await pool.query(queryInsertRating, [
      spaceRatings.space_id,
      userId,
      spaceRatings.rating,
    ]);

    return insertId;
  }

  const [{ affectedRows }] = await pool.query(queryUpdateRating, [
    spaceRatings.rating,
    spaceRatings.space_id,
    userId,
  ]);

  return affectedRows;
};

module.exports = {
  findOneSpaceRating,
  updateSpaceRating,
};
