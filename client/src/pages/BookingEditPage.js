import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Button from "../components/Button";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import formatDate from "../helpers/formatDate";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import { format, parse } from "date-fns";

export default function BookingEditPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const { data: booking, loading, error } = useFetch(`/bookings/${id}`, token);
  const [spaceId, setSpaceId] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (booking) {
      setSpaceId(booking.space_id);
      setStartDate(formatDate(booking.start_date));
      setEndDate(formatDate(booking.end_date));
    }
  }, [booking]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        space_id: spaceId,
        start_date: format(
          parse(startDate, "dd-MM-yyyy", new Date()),
          "yyyy-MM-dd"
        ),
        end_date: format(
          parse(endDate, "dd-MM-yyyy", new Date()),
          "yyyy-MM-dd"
        ),
      };

      const data = await fetchEndpoint(`/bookings/${id}`, token, "PUT", body);

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    <Alert color="error" icon="error">
      Error: {error.message}
    </Alert>;
  }

  return (
    <article>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <DatePicker selectedDate={startDate} setSelectedDate={setStartDate} />

        <DatePicker selectedDate={endDate} setSelectedDate={setEndDate} />

        <input type="hidden" name="space_id" value={spaceId} />

        <Button size="sm" shape="rounded">
          Editar reserva
        </Button>

        {errorMessage && (
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        )}
      </form>
    </article>
  );
}
