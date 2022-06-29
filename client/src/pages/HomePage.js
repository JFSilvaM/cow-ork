import Alert from "../components/Alert";
import SearchBox from "../components/SearchBox";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";

export default function HomePage() {
  const { data: spaces, loading, error } = useFetch("/spaces");

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

  return <SearchBox data={spaces} />;
}
