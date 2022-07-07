import { Link, useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import formatDate from "../helpers/formatDate";
import useFetch from "../hooks/useFetch";
import MapIcon from "../components/icons/MapIcon";
import CheckIcon from "../components/icons/CheckIcon";
import ErrorIcon from "../components/icons/ErrorIcon";

export default function BookingsPage() {
  const location = useLocation();
  const { data: bookings, loading, error } = useFetch(location.pathname);
  const pathname = location.pathname;

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

                  {booking.is_paid === 1 ? (
                    <Typography weight="bold">
                      <CheckIcon color="green">Pagado</CheckIcon>
                    </Typography>
                  ) : (
                    <Typography weight="bold">
                      <ErrorIcon color="orange">Pendiente de pago</ErrorIcon>
                    </Typography>
                  )}
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
    </section>
  );
}
