const pool = require("../database/getPool")();

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

  const [{ affectedRows }] = await pool.query(query, [id]);

  return affectedRows;
};

module.exports = {
  findAllSpaceTypes,
  findOneSpaceType,
  createSpaceType,
  updateSpaceType,
  removeSpaceType,
};
