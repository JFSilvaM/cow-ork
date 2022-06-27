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
    <div className="my-6 flex flex-col items-center justify-center">
      <input
        className="w-full rounded-md bg-gray-100 p-2"
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleChange}
      />

      <section className="my-6 grid grid-cols-4 gap-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Link to={`spaces/${result.id}`} key={result.id}>
              <article className="border p-2">
                <h4>{result.name}</h4>

                <img src={result.image} alt={result.name} />

                <p>{result.description}</p>

                <StarRating rating={result.rating} />

                <p>{result.price}€</p>

                <div className="flex gap-2">
                  {result.service_names.map((service) => (
                    <p key={service}>{service}</p>
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
