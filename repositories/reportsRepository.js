const pool = require("../database/getPool")();

const findAllReports = async () => {
  const query =
    "SELECT re.id, ca.name category_name, re.description, sp.name space_name, re.status, us.first_name, us.last_name, us.email, re.created_at, re.updated_at FROM reports re INNER JOIN spaces sp ON re.space_id = sp.id INNER JOIN users us ON re.user_id = us.id INNER JOIN report_categories ca ON re.category_id = ca.id";

  const [rows] = await pool.query(query);

  return rows;
};

const findOneReport = async (id) => {
  const query =
    "SELECT re.id, ca.name category_name, re.description, sp.name space_name, re.status, us.first_name, us.last_name, us.email, re.created_at, re.updated_at FROM reports re INNER JOIN spaces sp ON re.space_id = sp.id INNER JOIN users us ON re.user_id = us.id INNER JOIN report_categories ca ON re.category_id = ca.id WHERE re.id = ?";

  const [[row]] = await pool.query(query, [id]);

  return row;
};

const createReport = async (report) => {
  const query =
    "INSERT INTO reports (space_id, user_id, category_id, description, status) VALUES (?, ?, ?, ?, ?)";

  const [{ insertId }] = await pool.query(query, [
    report.space_id,
    report.user_id,
    report.category_id,
    report.description,
    report.status,
  ]);

  return insertId;
};

const updateReport = async (report, id) => {
  const query =
    "UPDATE reports SET space_id = ?, category_id = ?, description = ?, status = ? WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [
    report.space_id,
    report.category_id,
    report.description,
    report.status,
    id,
  ]);

  return affectedRows;
};

const removeReport = async (id) => {
  const query = "DELETE FROM reports WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [id]);

  return affectedRows;
};

module.exports = {
  findAllReports,
  findOneReport,
  createReport,
  updateReport,
  removeReport,
};
