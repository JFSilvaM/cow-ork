import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import BookingForm from "../components/BookingForm";
import ReportForm from "../components/ReportForm";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function SpacesIdPage() {
  const { id } = useParams("id");
  const { data: space, loading, error } = useFetch(`/spaces/${id}`);

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

        <div className="flex flex-row justify-between gap-3">
          <div className="flex w-full flex-col gap-3 divide-y-2 divide-dashed dark:divide-gray-400">
            <Typography>{space.description}</Typography>

            <Typography>{space.address}</Typography>

            <StarRating rating={space.rating} />

            <Typography>{space.capacity}</Typography>

            <Typography>{space.is_clean}</Typography>

            <Typography>{space.type_name}</Typography>

            <div className="flex gap-2">
              {space.service_names.map((service) => (
                <p key={service}>{service}</p>
              ))}
            </div>
          </div>

          <aside className="flex h-full flex-col gap-3">
            <div className="flex flex-col gap-5 rounded-2xl py-5 px-3 shadow dark:bg-gray-400 dark:text-black">
              <Typography>{space.price}€</Typography>

              <BookingForm spaceId={id} />
            </div>

            <div className="rounded-2xl py-5 px-3 shadow dark:bg-gray-400 dark:text-black">
              <Typography className="flex justify-center pb-5" size="xl">
                Reporte
              </Typography>

              <ReportForm spaceId={id} />
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
}
