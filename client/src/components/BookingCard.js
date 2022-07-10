import { differenceInDays, parseISO } from "date-fns";
import { useState } from "react";
import formatDate from "../helpers/formatDate";
import Button from "./Button";
import CheckIcon from "./icons/CheckIcon";
import ErrorIcon from "./icons/ErrorIcon";
import Modal from "./Modal";
import StarRating from "./StarRating";
import Typography from "./Typography";

export default function BookingCard({
  booking,
  rating,
  setRating,
  isOpen,
  setIsOpen,
  handleDelete,
  handleSubmit,
}) {
  const [selectedItem, setSelectedItem] = useState(booking);

  const calculateAmount = (booking) => {
    const daysDifference = differenceInDays(
      parseISO(booking.end_date),
      parseISO(booking.start_date)
    );

    return (daysDifference * booking.price).toFixed(2);
  };

  return (
    <article
      key={booking.id}
      className="flex flex-col rounded shadow dark:shadow-white md:flex-row"
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

            <Typography size="sm">{booking.address}</Typography>
          </div>

          <div className="flex flex-col gap-3">
            <article>
              <Typography as="h3" size="xl">
                Fecha de reserva:
              </Typography>
              <Typography>{formatDate(booking.created_at)}</Typography>
            </article>

            <article>
              <Typography as="h3" size="xl">
                Fecha de entrada:
              </Typography>
              <Typography>{formatDate(booking.start_date)}</Typography>
            </article>

            <article>
              <Typography as="h3" size="xl">
                Fecha de salida:
              </Typography>
              <Typography>{formatDate(booking.end_date)}</Typography>
            </article>

            <article>
              <Typography as="h3" size="xl">
                Estado:
              </Typography>

              {booking.is_clean ? (
                <div className="flex gap-2">
                  <CheckIcon color="green" />
                  <Typography>Limpio</Typography>
                </div>
              ) : (
                <div className="flex gap-2">
                  <ErrorIcon color="orange" />
                  <Typography>Pendiente de limpieza</Typography>
                </div>
              )}
            </article>

            <article>
              <Typography as="h3" size="xl">
                Precio total:
              </Typography>

              <Typography size="xxl" className="italic">
                {calculateAmount(booking)}€
              </Typography>
            </article>
          </div>
        </div>

        <div className="flex flex-col justify-between md:w-fit md:items-end">
          <div className="self-center">
            <form
              onSubmit={(e) => handleSubmit(e, booking.space_id)}
              className="flex flex-col items-center gap-2 rounded p-3"
            >
              <div className="flex items-center gap-2">
                <StarRating rating={rating} setRating={setRating} />
              </div>

              <div>
                <Button shape="rounded" size="sm">
                  Valorar
                </Button>
              </div>
            </form>
          </div>

          <div className="self-center">
            <Button
              variant="outlined"
              shape="rounded"
              color="error"
              onClick={() => {
                setIsOpen(true);
                setSelectedItem(booking);
              }}
            >
              Cancelar reserva
            </Button>
          </div>
        </div>

        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={(e) => handleDelete(e, selectedItem.id)}
        >
          ¿Realmente deseas borrar la reserva número{" "}
          <span className="font-semibold italic">{selectedItem.id}</span>?
        </Modal>
      </div>
    </article>
  );
}
