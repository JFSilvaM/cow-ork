import { useLocation, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import AdminTools from "../components/AdminTools";
import StarRating from "../components/StarRating";

export default function BookingsPage() {
  const location = useLocation();
  const { data: bookings, loading, error } = useFetch(location.pathname);
  const pathname = location.pathname;
  const { token } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        return;
      }
      const id = null;
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

    try {
      // TODO: Add a confirmation message before delete

      const data = await fetchEndpoint(`/bookings/${id}`, token, "DELETE");

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      navigate("/");
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
              <div className="flex-1">
                <AdminTools handleDelete={(e) => handleDelete(e, booking.id)} />
              </div>

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

                  <Typography className="flex gap-1">
                    Fecha de entrada:
                    <Typography weight="bold">
                      {formatDate(booking.start_date)}
                    </Typography>
                  </Typography>

                  <Typography className="flex gap-1">
                    Fecha de salida:
                    <Typography weight="bold">
                      {formatDate(booking.end_date)}
                    </Typography>
                  </Typography>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between gap-3 md:gap-0">
                <div className="flex w-full flex-col items-start gap-3 md:w-fit md:items-end">
                  {booking.is_clean === 1 ? (
                    <Typography weight="bold">
                      <CheckIcon color="green">Limpio</CheckIcon>
                    </Typography>
                  ) : (
                    <Typography weight="bold">
                      <ErrorIcon color="orange">
                        Pendiente de limpieza
                      </ErrorIcon>
                    </Typography>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center rounded-2xl py-5 px-3 shadow dark:bg-gray-500"
                  >
                    <Typography as="h4" className="pb-5" size="xl">
                      Tu opinión nos importa
                    </Typography>

                    <div className="flex flex-col justify-center gap-3">
                      <StarRating rating={rating} setRating={setRating} />

                      {token && <button className="border">Valorar</button>}

                      {errorMessage && (
                        <Alert color="error" icon="error">
                          {errorMessage.message}
                        </Alert>
                      )}
                    </div>
                  </form>
                </div>

                <Typography className="flex gap-1">
                  Total:
                  <Typography weight="bold">{booking.price}€</Typography>
                </Typography>
              </div>
            </div>
          </article>
        ))}
      </div>

      {errorMessage && (
        <div className="flex justify-center pt-5">
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        </div>
      )}
    </section>
  );
}
