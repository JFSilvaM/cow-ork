import { format, parse } from "date-fns";
import { useState } from "react";
import Alert from "../components/Alert";
import Button from "../components/Button";
import DatePicker from "../components/DatePicker";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";

export default function BookingForm({ spaceId }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();

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
        is_paid: 1,
      };

      const data = await fetchEndpoint("/bookings", token, "POST", body);

      if (data.error) {
        throw new Error(data.error);
      }

      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <article>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex gap-2">
          <DatePicker
            id="start_date"
            name="start_date"
            value={startDate}
            setSelectedDate={setStartDate}
          />

          <DatePicker
            id="end_date"
            name="end_date"
            value={endDate}
            setSelectedDate={setEndDate}
          />
        </div>

        <Button size="sm" shape="rounded">
          Reservar
        </Button>
      </form>

      {errorMessage && (
        <div className="flex justify-center pt-5">
          <Alert color="error" icon="error">
            {errorMessage}
          </Alert>
        </div>
      )}
    </article>
  );
}
