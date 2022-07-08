const pool = require("../database/getPool")();

const findAllBookings = async () => {
  const query =
    "SELECT bo.id, us.first_name, us.last_name, sp.name, sp.address, sp.image, sp.price, sp.is_clean, bo.space_id, bo.is_paid, bo.start_date, bo.end_date, bo.created_at FROM bookings bo INNER JOIN spaces sp ON bo.space_id = sp.id INNER JOIN users us ON bo.user_id = us.id ORDER BY bo.created_at DESC";

  const [rows] = await pool.query(query);

  return rows;
};

const findAllBookingsById = async (id) => {
  const query =
    "SELECT bo.id, us.first_name, us.last_name, sp.name, sp.address, sp.image, sp.price, sp.is_clean, bo.space_id, bo.is_paid, bo.start_date, bo.end_date, bo.created_at FROM bookings bo INNER JOIN spaces sp ON bo.space_id = sp.id INNER JOIN users us ON bo.user_id = us.id WHERE bo.user_id = ? ORDER BY bo.created_at DESC";

  const [rows] = await pool.query(query, [id]);

  return rows;
};

const findOneBooking = async (id, userId) => {
  const selectUser = "SELECT * FROM users WHERE id = ? AND is_admin = 1";

  const [[isAdmin]] = await pool.query(selectUser, [userId]);

  if (isAdmin) {
    const query =
      "SELECT bo.id, us.first_name, us.last_name, us.email, sp.name, sp.address, sp.image, sp.price, sp.is_clean, bo.space_id, bo.is_paid, bo.start_date, bo.end_date, bo.created_at FROM bookings bo INNER JOIN spaces sp ON bo.space_id = sp.id INNER JOIN users us ON bo.user_id = us.id WHERE bo.id = ?";

    const [[row]] = await pool.query(query, [id]);

    return row;
  }

  const query =
    "SELECT bo.id, us.first_name, us.last_name, us.email, sp.name, sp.address, sp.image, sp.price, sp.is_clean, bo.space_id, bo.is_paid, bo.start_date, bo.end_date, bo.created_at FROM bookings bo INNER JOIN spaces sp ON bo.space_id = sp.id INNER JOIN users us ON bo.user_id = us.id WHERE bo.id = ? AND bo.user_id = ?";

  const [[row]] = await pool.query(query, [id, userId]);

  return row;
};

const createBooking = async (booking, userId) => {
  const query =
    "INSERT INTO bookings (space_id, user_id, start_date, end_date) VALUES (?, ?, ?, ?)";

  const [{ insertId }] = await pool.query(query, [
    booking.space_id,
    userId,
    booking.start_date,
    booking.end_date,
  ]);

  return insertId;
};

const updateBooking = async (booking, id, userId) => {
  const selectUser = "SELECT * FROM users WHERE id = ? AND is_admin = 1";

  const [[isAdmin]] = await pool.query(selectUser, [userId]);

  if (isAdmin) {
    const query =
      "UPDATE bookings SET start_date = ?, end_date = ? WHERE id = ?";

    const [{ affectedRows }] = await pool.query(query, [
      booking.start_date,
      booking.end_date,
      id,
    ]);

    return affectedRows;
  }

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
  const selectUser = "SELECT * FROM users WHERE id = ? AND is_admin = 1";

  const [[isAdmin]] = await pool.query(selectUser, [userId]);

  if (isAdmin) {
    const query = "DELETE FROM bookings WHERE id = ?";

    const [{ affectedRows }] = await pool.query(query, [id]);

    return affectedRows;
  }

  const query = "DELETE FROM bookings WHERE id = ? AND user_id = ?";

  const [{ affectedRows }] = await pool.query(query, [id, userId]);

  return affectedRows;
};

const validateBooking = async (booking) => {
  const query =
    "SELECT id FROM bookings WHERE space_id = ? AND (start_date BETWEEN ? AND ? OR end_date BETWEEN ? AND ?)";

  const [[row]] = await pool.query(query, [
    booking.space_id,
    booking.start_date,
    booking.end_date,
    booking.start_date,
    booking.end_date,
  ]);

  return row;
};

module.exports = {
  findAllBookings,
  findAllBookingsById,
  findOneBooking,
  createBooking,
  updateBooking,
  removeBooking,
  validateBooking,
};
