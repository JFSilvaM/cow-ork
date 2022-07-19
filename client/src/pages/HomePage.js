import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Alert from "../components/Alert";
import FilterMenuBar from "../components/FilterMenuBar";
import Spinner from "../components/Spinner";
import useFetch from "../hooks/useFetch";
import ItemNotFound from "./ItemNotFound";

export default function HomePage() {
  const { data: spaces, loading, error } = useFetch("/spaces");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setFilteredResults(spaces);
  }, [spaces]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="flex">
        <Alert color="error" icon="error">
          Error: {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <section className="my-3 flex w-full flex-col gap-3 px-2 sm:flex-row">
      <article className="static w-full sm:w-1/4">
        <FilterMenuBar setFilteredResults={setFilteredResults} />
      </article>

      <article className="w-full sm:w-3/4">
        {filteredResults && filteredResults.length > 0 ? (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResults.map((result) => (
              <Link to={`spaces/${result.id}`} key={result.id}>
                <Card space={result} />
              </Link>
            ))}
          </section>
        ) : (
          <ItemNotFound simple>
            No existe ningún resultado para tu búsqueda.
          </ItemNotFound>
        )}
      </article>
    </section>
  );
}
