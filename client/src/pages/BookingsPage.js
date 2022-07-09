import { useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import formatDate from "../helpers/formatDate";
import useFetch from "../hooks/useFetch";
import MapIcon from "../components/icons/MapIcon";
import CheckIcon from "../components/icons/CheckIcon";
import ErrorIcon from "../components/icons/ErrorIcon";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useEffect, useState } from "react";
import StarRating from "../components/StarRating";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function BookingsPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const { data: baseBookings, loading, error } = useFetch(pathname);
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
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
        <Typography
          as="h4"
          size="xxxl"
          weight="bold"
          className="rounded bg-indigo-500 p-3 text-center text-white dark:bg-emerald-500"
        >
          {pathname === "/bookings" ? "Mis reservas" : "Todas las reservas"}
        </Typography>

        {bookings.map((booking) => (
          <article
            key={booking.id}
            className="flex flex-col rounded p-2 shadow dark:shadow-white md:flex-row"
          >
            <img
              className="w-full rounded object-cover md:w-2/5 xl:w-1/2"
              src={`/images/spaces/${booking.image}`}
              alt={booking.name}
            />

            <div className="flex w-full flex-col gap-3 p-5 md:flex-row md:justify-between">
              <div className="flex flex-col gap-3">
                <div>
                  <Typography size="xxl" weight="bold">
                    {booking.name}
                  </Typography>

                  <div className="flex items-center gap-1">
                    <MapIcon />

                    <Typography size="sm">{booking.address}</Typography>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Typography>
                    Fecha de la reserva: {formatDate(booking.created_at)}
                  </Typography>

                  <div className="flex gap-1">
                    <Typography>Fecha de entrada:</Typography>
                    <Typography weight="bold">
                      {formatDate(booking.start_date)}
                    </Typography>
                  </div>

                  <div className="flex gap-1">
                    <Typography>Fecha de salida:</Typography>
                    <Typography weight="bold">
                      {formatDate(booking.end_date)}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-3 md:gap-0">
                <div className="flex w-full flex-col items-start gap-3 md:w-fit md:items-end">
                  {booking.is_clean ? (
                    <div className="flex gap-2">
                      <CheckIcon color="green" />
                      <Typography weight="bold">Limpio</Typography>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <ErrorIcon color="orange" />

                      <Typography weight="bold">
                        Pendiente de limpieza
                      </Typography>
                    </div>
                  )}

                  <form
                    onSubmit={(e) => handleSubmit(e, booking.id)}
                    className="flex flex-col items-center rounded-2xl py-5 px-3 shadow dark:bg-gray-500"
                  >
                    <Typography as="h4" className="pb-5" size="xl">
                      Tu opinión nos importa
                    </Typography>

                    <div className="flex flex-col justify-center gap-3">
                      <StarRating rating={rating} setRating={setRating} />

                      <button className="border">Valorar</button>

                      {errorMessage && (
                        <Alert color="error" icon="error">
                          {errorMessage.message}
                        </Alert>
                      )}
                    </div>
                  </form>
                </div>

                <div className="flex items-center gap-1">
                  <Typography>Precio por día:</Typography>
                  <Typography weight="bold">{booking.price}€</Typography>
                </div>
              </div>

              <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClick={(e) => handleDelete(e, selectedItem)}
              >
                ¿Realmente deseas borrar la reserva número{" "}
                <span className="font-semibold italic">{selectedItem}</span>?
              </Modal>

              <div className="">
                <Button
                  variant="outlined"
                  shape="rounded"
                  color="error"
                  size="lg"
                  onClick={() => {
                    setIsOpen(true);
                    setSelectedItem(booking.id);
                  }}
                >
                  Cancelar reserva
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
