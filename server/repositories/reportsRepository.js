const pool = require("../database/getPool")();

const findAllReports = async () => {
  const query =
    "SELECT re.id, ca.name category_name, re.description, sp.name space_name, re.status, us.first_name, us.last_name, us.email, re.created_at, re.updated_at FROM reports re INNER JOIN spaces sp ON re.space_id = sp.id INNER JOIN users us ON re.user_id = us.id INNER JOIN report_categories ca ON re.category_id = ca.id ORDER BY re.created_at DESC";

  const [rows] = await pool.query(query);

  return rows;
};

const findAllReportsById = async (userId) => {
  const query =
    "SELECT re.id, ca.name category_name, re.description, sp.name space_name, re.status, us.first_name, us.last_name, us.email, re.created_at, re.updated_at FROM reports re INNER JOIN spaces sp ON re.space_id = sp.id INNER JOIN users us ON re.user_id = us.id INNER JOIN report_categories ca ON re.category_id = ca.id WHERE re.user_id = ? ORDER BY re.created_at DESC";

  const [rows] = await pool.query(query, [userId]);

  return rows;
};

const findOneReport = async (id, userId) => {
  const query =
    "SELECT re.id, ca.name category_name, re.description, sp.name space_name, re.status, us.first_name, us.last_name, us.email, re.created_at, re.updated_at FROM reports re INNER JOIN spaces sp ON re.space_id = sp.id INNER JOIN users us ON re.user_id = us.id INNER JOIN report_categories ca ON re.category_id = ca.id WHERE re.id = ? AND re.user_id = ?";

  const [[row]] = await pool.query(query, [id, userId]);

  return row;
};

const createReport = async (report, userId) => {
  const query =
    "INSERT INTO reports (space_id, user_id, category_id, description) VALUES (?, ?, ?, ?)";

  const [{ insertId }] = await pool.query(query, [
    report.space_id,
    userId,
    report.category_id,
    report.description,
  ]);

  return insertId;
};

const updateReport = async (report, id, userId) => {
  const query =
    "UPDATE reports SET space_id = ?, category_id = ?, description = ?, status = ? WHERE id = ? AND user_id = ?";

  const [{ affectedRows }] = await pool.query(query, [
    report.space_id,
    report.category_id,
    report.description,
    report.status,
    id,
    userId,
  ]);

  return affectedRows;
};

const removeReport = async (id, userId) => {
  const query = "DELETE FROM reports WHERE id = ? AND user_id = ?";

  const [{ affectedRows }] = await pool.query(query, [id, userId]);

  return affectedRows;
};

module.exports = {
  findAllReports,
  findAllReportsById,
  findOneReport,
  createReport,
  updateReport,
  removeReport,
};
