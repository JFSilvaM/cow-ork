import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function SearchBox({ data }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setResults(data);
    setFilteredResults(data);
  }, [data]);

  const handleChange = (e) => {
    setSearch(e.target.value);

    if (e.target.value.length > 0) {
      setFilteredResults(
        results.filter((item) => {
          return item.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
      );
    }

    if (e.target.value.length === 0) {
      setFilteredResults(results);
    }
  };

  return (
    <div className="my-6 flex w-full flex-col">
      <input
        className="rounded-md bg-gray-100 p-2"
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleChange}
      />

      <section className="flex w-full flex-row flex-wrap gap-7 py-7">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Link to={`spaces/${result.id}`} key={result.id}>
              <article className="flex h-96 w-80 flex-col rounded-3xl bg-white p-2 shadow-xl transition-all duration-500 ease-in-out hover:bg-gray-800 hover:shadow-none">
                <div className="relative">
                  <div className="h-56 overflow-hidden rounded-2xl">
                    <img
                      className="h-full object-cover"
                      src={`/images/spaces/${result.image}`}
                      alt={result.name}
                    />
                  </div>

                  <div className="absolute top-0 left-0 right-0 flex flex-row">
                    <div className="flex h-10 w-full items-center justify-between rounded-t-2xl bg-gray-500 bg-opacity-20 px-2 shadow">
                      <h4>{result.name}</h4>

                      <p>{result.price}€</p>
                    </div>
                  </div>
                </div>

                <p className="truncate">{result.description}</p>

                <StarRating rating={result.rating} />

                <div className="flex flex-row flex-wrap gap-1">
                  {result.service_names.map((service) => (
                    <p key={service}>#{service}</p>
                  ))}
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p>No existe ningún resultado</p>
        )}
      </section>
    </div>
  );
}
