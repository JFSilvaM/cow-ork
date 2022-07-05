import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

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
    <section className="my-3 flex w-full flex-col gap-5">
      <input
        className="mx-2 rounded-md bg-gray-200 p-2 px-3 shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
        placeholder="Buscar..."
        value={search}
        onChange={handleChange}
      />

      <section className="-px-2 flex flex-wrap">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Link
              className="2xl:1/6 mb-3 w-full px-2 focus:outline-none sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              to={`spaces/${result.id}`}
              key={result.id}
            >
              <Card space={result} />
            </Link>
          ))
        ) : (
          <p className="px-2">No existe ningún resultado</p>
        )}
      </section>
    </section>
  );
}
