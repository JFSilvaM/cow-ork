const pool = require("../database/getPool")();

const findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";

  const [[row]] = await pool.query(query, [email]);

  return row;
};

const createUser = async (user) => {
  const query =
    "INSERT INTO users (first_name, last_name, email, hashed_password, activation_code) VALUES (?, ?, ?, ?, ?)";

  const [{ insertId }] = await pool.query(query, [
    user.firstName,
    user.lastName,
    user.email,
    user.hashedPassword,
    user.activationCode,
  ]);

  return insertId;
};

const updateUserActivation = async (activationCode) => {
  const query =
    "UPDATE users SET is_active = 1, activation_code = '' WHERE activation_code = ?";

  const [{ affectedRows }] = await pool.query(query, [activationCode]);

  return affectedRows;
};

module.exports = {
  findUserByEmail,
  createUser,
  updateUserActivation,
};
