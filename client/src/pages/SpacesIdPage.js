import { format, parse } from "date-fns";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import DatePicker from "../components/DatePicker";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";

export default function SpacesIdPage() {
  const { id } = useParams("id");
  const { data: space, loading, error } = useFetch(`/spaces/${id}`);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        space_id: e.target.space_id.value,
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

      console.log(body);

      const data = await fetchEndpoint("/bookings", token, "POST", body);

      if (data.error) {
        throw new Error(data.error);
      }

      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
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
    <main className="container mx-auto px-3 dark:text-white md:px-0">
      <section className="flex items-center justify-between">
        <article>
          <Typography as="h4" size="xxl">
            {space.name}
          </Typography>

          <img src={`/images/spaces/${space.image}`} alt={space.name} />

          <Typography>{space.description}</Typography>
          <Typography>{space.address}</Typography>
          <Typography>{space.capacity}</Typography>
          <Typography>{space.is_clean}</Typography>
          <Typography>{space.type_name}</Typography>

          <StarRating rating={space.rating} />

          <Typography>{space.price}€</Typography>

          <div className="flex gap-2">
            {space.service_names.map((service) => (
              <p key={service}>{service}</p>
            ))}
          </div>
        </article>

        <article>
          <form onSubmit={handleSubmit}>
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

            <input type="hidden" name="space_id" value={id} />

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
      </section>
    </main>
  );
}
