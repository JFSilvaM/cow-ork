import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Input from "./Input";

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
    <section className="flex w-full flex-col">
      <Input placeholder="Buscar..." value={search} onChange={handleChange} />

      <section className="my-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Link to={`spaces/${result.id}`} key={result.id}>
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
