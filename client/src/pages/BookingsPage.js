import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";

export default function BookingsPage() {
  const { data: baseBookings, loading, error } = useFetch("/bookings");
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (baseBookings) {
      setBookings(baseBookings);
    }
  }, [baseBookings]);

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    try {
      const body = {
        space_id: id,
        rating,
      };

      const data = await fetchEndpoint(
        `/space_ratings/${id}`,
        token,
        "PUT",
        body
      );

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      const spaceRating = await fetchEndpoint(`/space_ratings/${id}`, token);

      if (spaceRating?.status === "error") {
        throw new Error(spaceRating.message);
      }

      setRating(spaceRating.rating);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    setIsOpen(false);

    try {
      const data = await fetchEndpoint(`/bookings/${id}`, token, "DELETE");

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      const newBookings = bookings.filter((booking) => booking.id !== id);
      setBookings(newBookings);
    } catch (error) {
      setErrorMessage(error);
    }
  };

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
    <section className="flex w-full justify-center px-3 text-slate-800 dark:text-slate-200">
      <div className="flex w-full flex-col gap-5 lg:w-3/4">
        <Typography as="h4" size="xxxl" weight="bold" align="center">
          Mis reservas
        </Typography>

        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            rating={rating}
            setRating={setRating}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
          />
        ))}

        {errorMessage && (
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        )}
      </div>
    </section>
  );
}
