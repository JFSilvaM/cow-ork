import { useState, useEffect, useMemo } from "react";

const BASE_URL = "http://localhost:3001/api";

export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(BASE_URL + path);
        const json = await res.json();

        if (!res.ok || json.status === "error") {
          throw new Error(json.message || res.statusText);
        }

        setData(json.data);
      } catch (error) {
        setError(error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, [path]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
}
