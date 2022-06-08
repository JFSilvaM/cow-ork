const pool = require("../database/getPool")();

const findAllBookings = async () => {
  const query =
    "SELECT bo.id, us.first_name, us.last_name, sp.name, sp.address, sp.price, sp.is_clean, bo.is_paid, bo.start_date, bo.end_date, bo.created_at FROM bookings bo INNER JOIN spaces sp ON bo.space_id = sp.id INNER JOIN users us ON bo.user_id = us.id";

  const [rows] = await pool.query(query);

  return rows;
};

const findOneBooking = async (id) => {
  const query =
    "SELECT bo.id, us.first_name, us.last_name, sp.name, sp.address, sp.price, sp.is_clean, bo.is_paid, bo.start_date, bo.end_date, bo.created_at FROM bookings bo INNER JOIN spaces sp ON bo.space_id = sp.id INNER JOIN users us ON bo.user_id = us.id WHERE bo.id = ?";

  const [[row]] = await pool.query(query, [id]);

  return row;
};

const createBooking = async (booking) => {
  const query =
    "INSERT INTO bookings (user_id, space_id, start_date, end_date, is_paid) VALUES (?, ?, ?, ?, ?)";

  const [{ insertId }] = await pool.query(query, [
    booking.user_id,
    booking.space_id,
    booking.start_date,
    booking.end_date,
    booking.is_paid,
  ]);

  return insertId;
};

const updateBooking = async (booking, id) => {
  const query = "UPDATE bookings SET start_date = ?, end_date = ? WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [
    booking.start_date,
    booking.end_date,
    id,
  ]);

  return affectedRows;
};

const removeBooking = async (id) => {
  const query = "DELETE FROM bookings WHERE id = ?";

  const [{ affectedRows }] = await pool.query(query, [id]);

  return affectedRows;
};

module.exports = {
  findAllBookings,
  findOneBooking,
  createBooking,
  updateBooking,
  removeBooking,
};
