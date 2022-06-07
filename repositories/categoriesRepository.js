const pool = require("../database/getPool")();

const findAllCategories = async () => {
  const query = "SELECT * FROM categories";

  const [rows] = await pool.query(query);

  return rows;
};

const findOneCategory = async (id) => {
  const query = "SELECT * FROM categories WHERE id = ?";

  const [[row]] = await pool.query(query, [id]);

  return row;
};

const createCategory = async (category) => {
  const query = "INSERT INTO categories (name) VALUES (?)";

  const [{ insertId }] = await pool.query(query, [category.name]);

  return insertId;
};

const updateCategory = async (category, id) => {
  const query = "UPDATE categories SET name = ? WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [category.name, id]);

  return affectedRows;
};

const removeCategory = async (id) => {
  const query = "DELETE FROM categories WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [id]);

  return affectedRows;
};

module.exports = {
  findAllCategories,
  findOneCategory,
  createCategory,
  updateCategory,
  removeCategory,
};
