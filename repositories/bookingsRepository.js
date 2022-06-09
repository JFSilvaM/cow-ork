const pool = require("../database/getPool")();

const findAllBookings = async (id) => {
  const query =
    "SELECT bo.id, us.first_name, us.last_name, sp.name, sp.address, sp.price, sp.is_clean, bo.is_paid, bo.start_date, bo.end_date, bo.created_at FROM bookings bo INNER JOIN spaces sp ON bo.space_id = sp.id INNER JOIN users us ON bo.user_id = us.id WHERE bo.user_id = ? ORDER BY bo.created_at DESC";

  const [rows] = await pool.query(query, [id]);

  return rows;
};

const findOneBooking = async (id, userId) => {
  const query =
    "SELECT bo.id, us.first_name, us.last_name, sp.name, sp.address, sp.price, sp.is_clean, bo.is_paid, bo.start_date, bo.end_date, bo.created_at FROM bookings bo INNER JOIN spaces sp ON bo.space_id = sp.id INNER JOIN users us ON bo.user_id = us.id WHERE bo.id = ? AND bo.user_id = ?";

  const [[row]] = await pool.query(query, [id, userId]);

  return row;
};

const createBooking = async (booking, userId) => {
  const query =
    "INSERT INTO bookings (user_id, space_id, start_date, end_date, is_paid) VALUES (?, ?, ?, ?, ?)";

  const [{ insertId }] = await pool.query(query, [
    userId,
    booking.space_id,
    booking.start_date,
    booking.end_date,
    booking.is_paid,
  ]);

  return insertId;
};

const updateBooking = async (booking, id, userId) => {
  const query =
    "UPDATE bookings SET start_date = ?, end_date = ? WHERE id = ? AND user_id = ?";

  const [{ affectedRows }] = await pool.query(query, [
    booking.start_date,
    booking.end_date,
    id,
    userId,
  ]);

  return affectedRows;
};

const removeBooking = async (id, userId) => {
  const query = "DELETE FROM bookings WHERE id = ? AND user_id = ?";

  const [{ affectedRows }] = await pool.query(query, [id, userId]);

  return affectedRows;
};

module.exports = {
  findAllBookings,
  findOneBooking,
  createBooking,
  updateBooking,
  removeBooking,
};
