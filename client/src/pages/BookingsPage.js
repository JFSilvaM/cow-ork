import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";

export default function BookingsPage() {
  const { data: bookings, loading, error } = useFetch("/bookings");

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
          <h2>{booking.start_date}</h2>
          <p>{booking.end_date}</p>
        </article>
      ))}
    </section>
  );
}
