import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";
import ItemNotFound from "./ItemNotFound";

export default function BookingsPage() {
  const { data: baseBookings, loading } = useFetch("/bookings");
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (baseBookings) {
      setBookings(baseBookings);
    }
  }, [baseBookings]);

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
      console.error(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="flex w-full justify-center px-3 text-slate-800 dark:text-slate-200">
      <div className="flex w-full flex-col gap-5 xl:w-3/4">
        <Typography as="h4" size="xxxl" weight="bold" align="center">
          Mis reservas
        </Typography>

        {bookings.length ? (
          bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <ItemNotFound>No tienes ninguna reserva</ItemNotFound>
        )}
      </div>
    </section>
  );
}
