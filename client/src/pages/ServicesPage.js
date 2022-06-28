import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function ServicesPage() {
  const { data: services, loading, error } = useFetch("/services");

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
    <section>
      {services.map((service) => (
        <article key={service.id}>
          <Typography>{service.name}</Typography>
        </article>
      ))}
    </section>
  );
}
