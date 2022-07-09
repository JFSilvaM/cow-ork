const pool = require("../database/getPool")();
const {
  SPACE_TYPE_REFERENCED,
  SPACE_TYPE_DELETE_ERROR,
} = require("../messages/messages");

const findAllSpaceTypes = async () => {
  const query = "SELECT * FROM space_types";

  const [rows] = await pool.query(query);

  return rows;
};

const findOneSpaceType = async (id) => {
  const query = "SELECT * FROM space_types WHERE id = ?";

  const [[row]] = await pool.query(query, [id]);

  return row;
};

const createSpaceType = async (spaceType) => {
  const query = "INSERT INTO space_types (name) VALUES (?)";

  const [{ insertId }] = await pool.query(query, [spaceType.name]);

  return insertId;
};

const updateSpaceType = async (spaceType, id) => {
  const query = "UPDATE space_types SET name = ? WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [spaceType.name, id]);

  return affectedRows;
};

const removeSpaceType = async (id) => {
  const query = "DELETE FROM space_types WHERE id = ?";

  const [{ affectedRows }] = await pool
    .query(query, [id])
    .then((rows) => rows)
    .catch((err) => {
      switch (err.code) {
        case "ER_ROW_IS_REFERENCED_2":
          throw new Error(SPACE_TYPE_REFERENCED);
        default:
          throw new Error(SPACE_TYPE_DELETE_ERROR);
      }
    });

  return affectedRows;
};

module.exports = {
  findAllSpaceTypes,
  findOneSpaceType,
  createSpaceType,
  updateSpaceType,
  removeSpaceType,
};
