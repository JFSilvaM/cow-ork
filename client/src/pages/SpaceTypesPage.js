import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function SpaceTypesPage() {
  const { data: spaceTypes, loading, error } = useFetch("/space_types");

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
      {spaceTypes.map((spaceType) => (
        <article key={spaceType.id}>
          <Typography>{spaceType.name}</Typography>
        </article>
      ))}
    </section>
  );
}
