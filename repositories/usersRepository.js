const bcrypt = require("bcrypt");
const pool = require("../database/getPool")();

const findAllUsers = async () => {
  const query =
    "SELECT id, first_name, last_name, email, bio, avatar, is_admin, is_active, created_at, updated_at FROM users";

  const [rows] = await pool.query(query);

  return rows;
};

const findOneUser = async (id) => {
  const query =
    "SELECT id, first_name, last_name, email, bio, avatar FROM users WHERE id = ?";

  const [[row]] = await pool.query(query, [id]);

  return row;
};

const updateUser = async (user, userId) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const query =
    "UPDATE users SET first_name = ?, last_name = ?, email = ?, hashed_password = ?, bio = ?, avatar = ? WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [
    user.first_name,
    user.last_name,
    user.email,
    hashedPassword,
    user.bio,
    user.avatar || "default.png",
    userId,
  ]);

  return affectedRows;
};

const removeUser = async (id) => {
  const query = "DELETE FROM users WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [id]);

  return affectedRows;
};

module.exports = {
  findAllUsers,
  findOneUser,
  updateUser,
  removeUser,
};
