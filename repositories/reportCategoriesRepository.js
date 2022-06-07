const pool = require("../database/getPool")();

const findAllReportCategories = async () => {
  const query = "SELECT * FROM report_categories";

  const [rows] = await pool.query(query);

  return rows;
};

const findOneReportCategory = async (id) => {
  const query = "SELECT * FROM report_categories WHERE id = ?";

  const [[row]] = await pool.query(query, [id]);

  return row;
};

const createReportCategory = async (reportCategory) => {
  const query = "INSERT INTO report_categories (name) VALUES (?)";

  const [{ insertId }] = await pool.query(query, [reportCategory.name]);

  return insertId;
};

const updateReportCategory = async (reportCategory, id) => {
  const query = "UPDATE report_categories SET name = ? WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [reportCategory.name, id]);

  return affectedRows;
};

const removeReportCategory = async (id) => {
  const query = "DELETE FROM report_categories WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [id]);

  return affectedRows;
};

module.exports = {
  findAllReportCategories,
  findOneReportCategory,
  createReportCategory,
  updateReportCategory,
  removeReportCategory,
};
