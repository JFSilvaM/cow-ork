const pool = require("../database/getPool")();
const {
  SERVICE_REFERENCED,
  SERVICE_DELETE_ERROR,
} = require("../messages/messages");

const findAllServices = async () => {
  const query = "SELECT * FROM services";

  const [rows] = await pool.query(query);

  return rows;
};

const findOneService = async (id) => {
  const query = "SELECT * FROM services WHERE id = ?";

  const [[row]] = await pool.query(query, [id]);

  return row;
};

const createService = async (service) => {
  const query = "INSERT INTO services (name) VALUES (?)";

  const [{ insertId }] = await pool.query(query, [service.name]);

  return insertId;
};

const updateService = async (service, id) => {
  const query = "UPDATE services SET name = ? WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [service.name, id]);

  return affectedRows;
};

const removeService = async (id) => {
  const query = "DELETE FROM services WHERE id = ?";

  const [{ affectedRows }] = await pool
    .query(query, [id])
    .then((rows) => rows)
    .catch((err) => {
      switch (err.code) {
        case "ER_ROW_IS_REFERENCED_2":
          throw new Error(SERVICE_REFERENCED);
        default:
          throw new Error(SERVICE_DELETE_ERROR);
      }
    });

  return affectedRows;
};

module.exports = {
  findAllServices,
  findOneService,
  createService,
  updateService,
  removeService,
};
