const pool = require("../database/getPool")();

const findAllSpaces = async (queryParams) => {
  const query =
    "SELECT sp.*, st.name as type_name, GROUP_CONCAT(se.name) AS service_name FROM spaces sp INNER JOIN space_types st ON sp.type_id = st.id INNER JOIN space_services ss ON sp.id = ss.space_id INNER JOIN services se ON ss.service_id = se.id WHERE sp.name LIKE ? AND sp.address LIKE ? AND sp.price BETWEEN ? AND ? AND st.name LIKE ? AND se.name LIKE ? GROUP BY sp.id";

  const [rows] = await pool.query(query, [
    queryParams.name || "%",
    queryParams.address || "%",
    queryParams.minPrice || 0,
    queryParams.maxPrice || Number.MAX_SAFE_INTEGER,
    queryParams.type || "%",
    queryParams.services || "%",
  ]);

  return rows;
};

const findOneSpace = async (id) => {
  const query =
    "SELECT sp.*, st.name AS type_name FROM spaces sp INNER JOIN space_types st ON sp.type_id = st.id WHERE sp.id = ?";

  const [[row]] = await pool.query(query, [id]);

  return row;
};

const createSpace = async (space) => {
  const query =
    "INSERT INTO spaces (name, description, address, price, capacity, is_clean, type_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

  const [{ insertId }] = await pool.query(query, [
    space.name,
    space.description,
    space.address,
    space.price,
    space.capacity,
    space.is_clean,
    space.type_id,
  ]);

  return insertId;
};

const updateSpace = async (space, id) => {
  const query =
    "UPDATE spaces SET name = ?, description = ?, address = ?, price = ?, capacity = ?, is_clean = ?, type_id = ? WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [
    space.name,
    space.description,
    space.address,
    space.price,
    space.capacity,
    space.is_clean,
    space.type_id,
    id,
  ]);

  return affectedRows;
};

const removeSpace = async (id) => {
  const query = "DELETE FROM spaces WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [id]);

  return affectedRows;
};

module.exports = {
  findAllSpaces,
  findOneSpace,
  createSpace,
  updateSpace,
  removeSpace,
};