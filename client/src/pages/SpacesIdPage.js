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

        <aside className="flex flex-col gap-2 self-start">
          <ReportForm spaceId={id} />

          <BookingForm spaceId={id} />
        </aside>
      </section>
    </main>
  );
}
