import { useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function BookingsPage() {
  const location = useLocation();
  const { data: bookings, loading, error } = useFetch(location.pathname);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert color="error" icon="error">
        Error: {error.message}
      </Alert>
    );
  }

  return (
    <section>
      {bookings.map((booking) => (
        <article key={booking.id}>
          <Typography>{booking.name}</Typography>
          <Typography>{booking.address}</Typography>
          <Typography>{booking.price}</Typography>
          <Typography>{booking.is_clean}</Typography>
          <Typography>{booking.is_paid}</Typography>
          <Typography>{booking.created_at}</Typography>
          <Typography>{booking.start_date}</Typography>
          <Typography>{booking.end_date}</Typography>
        </article>
      ))}
    </section>
  );
}
