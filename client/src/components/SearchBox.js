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
    <div className="my-6 flex w-full flex-col gap-5">
      <input
        className="rounded-md bg-gray-100 p-2"
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={handleChange}
      />

      <section className="-mx-2 flex flex-wrap">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <Link
              className="2xl:1/6 mb-3 w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              to={`spaces/${result.id}`}
              key={result.id}
            >
              <article className="h-full rounded-3xl p-2 pr-3 shadow-xl transition-all duration-500 ease-in-out hover:bg-gray-800 hover:text-white hover:shadow-none dark:bg-gray-700 dark:text-white dark:hover:bg-white dark:hover:text-black">
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      className="h-72 w-full object-cover sm:h-56"
                      src={`/images/spaces/${result.image}`}
                      alt={result.name}
                    />
                  </div>

                  <div className="absolute top-0 left-0 right-0 flex flex-row">
                    <div className="flex h-10 w-full items-center justify-between rounded-t-2xl bg-gray-500 bg-opacity-20 px-2 text-black shadow">
                      <h4>{result.name}</h4>

                      <p>{result.price}€</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 py-3">
                  <p className="truncate">{result.description}</p>

                  <StarRating rating={result.rating} />

                  <div className="flex flex-row flex-wrap gap-1">
                    {result.service_names.map((service) => (
                      <p key={service}>#{service}</p>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p>No existe ningún resultado</p>
        )}
      </section>
    </div>

    // <div className="my-6 flex w-full flex-col">
    //   <input
    //     className="rounded-md bg-gray-100 p-2"
    //     type="text"
    //     placeholder="Buscar..."
    //     value={search}
    //     onChange={handleChange}
    //   />

    //   <section className="flex w-full flex-wrap py-7">
    //     {filteredResults.length > 0 ? (
    //       filteredResults.map((result) => (
    //         <Link to={`spaces/${result.id}`} key={result.id}>
    //           <article className="h-96 w-72 rounded-3xl p-2 shadow-xl transition-all duration-500 ease-in-out hover:bg-gray-800 hover:shadow-none">
    //             <div className="relative">
    //               <div className="h-56 overflow-hidden rounded-2xl">
    //                 <img
    //                   className="h-full object-cover"
    //                   src={`/images/spaces/${result.image}`}
    //                   alt={result.name}
    //                 />
    //               </div>

    //               <div className="absolute top-0 left-0 right-0 flex flex-row">
    //                 <div className="flex h-10 w-full items-center justify-between rounded-t-2xl bg-gray-500 bg-opacity-20 px-2 shadow">
    //                   <h4>{result.name}</h4>

    //                   <p>{result.price}€</p>
    //                 </div>
    //               </div>
    //             </div>

    //             <div className="flex flex-col gap-2 py-3 hover:text-white">
    //               <p className="truncate">{result.description}</p>

    //               <StarRating rating={result.rating} />

    //               <div className="flex flex-row flex-wrap gap-1">
    //                 {result.service_names.map((service) => (
    //                   <p key={service}>#{service}</p>
    //                 ))}
    //               </div>
    //             </div>
    //           </article>
    //         </Link>
    //       ))
    //     ) : (
    //       <p>No existe ningún resultado</p>
    //     )}
    //   </section>
    // </div>
  );
}
