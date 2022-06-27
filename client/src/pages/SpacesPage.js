import Alert from "../components/Alert";
import SearchBox from "../components/SearchBox";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";

export default function SpacesPage() {
  const { data: spaces, loading, error } = useFetch("/spacs");

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
      <SearchBox data={spaces} />
    </section>
  );
}
