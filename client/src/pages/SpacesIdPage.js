import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import BookingForm from "../components/BookingForm";
import ReportForm from "../components/ReportForm";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";

export default function SpacesIdPage() {
  const { id } = useParams("id");
  const { data: space, loading, error } = useFetch(`/spaces/${id}`);
  const { token } = useAuth();
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (space) {
      setRating(space.rating);
    }
  }, [space]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        return;
      }

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
    <section className="flex w-full flex-col items-center px-3 lg:px-0">
      <article className="flex w-full flex-col justify-center gap-5 dark:text-white lg:w-3/4">
        <Typography as="h4" size="xxxl">
          {space.name}
        </Typography>

        <img
          className="rounded-2xl object-cover"
          src={`/images/spaces/${space.image}`}
          alt={space.name}
        />

        <div className="flex flex-col justify-between gap-3 lg:flex-row">
          <div className="flex w-full flex-col space-y-2 divide-y-2 divide-dashed dark:divide-gray-400">
            <Typography>{space.description}</Typography>

            <Typography>{space.address}</Typography>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <StarRating rating={rating} setRating={setRating} />
              {token && <button>Valorar</button>}

              {errorMessage && (
                <Alert color="error" icon="error">
                  {errorMessage.message}
                </Alert>
              )}
            </form>

            <Typography>{space.price}</Typography>

            <Typography>{space.capacity}</Typography>

            <Typography>{space.is_clean}</Typography>

            <Typography>{space.type_name}</Typography>

            <div className="flex gap-2">
              {space.service_names.map((service) => (
                <Typography key={service}>{service}</Typography>
              ))}
            </div>
          </div>

          {token && (
            <aside className="flex h-full flex-col gap-3">
              <div className="flex flex-col rounded-2xl py-5 px-3 shadow dark:bg-gray-400 dark:text-black">
                <Typography className="flex justify-center pb-5" size="xl">
                  Reservar
                </Typography>

                <BookingForm spaceId={id} />
              </div>

              <div className="rounded-2xl py-5 px-3 shadow dark:bg-gray-400 dark:text-black">
                <Typography className="flex justify-center pb-5" size="xl">
                  Reportar
                </Typography>

                <ReportForm spaceId={id} />
              </div>
            </aside>
          )}
        </div>
      </article>
    </section>
  );
}
