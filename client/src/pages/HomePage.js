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

  return (
    <main className="container mx-auto px-3 dark:text-white md:px-0">
      <section>
        <SearchBox data={spaces} />
      </section>

      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
      <p>Soy el home</p>
    </main>
  );
}
