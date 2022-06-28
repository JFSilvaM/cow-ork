import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";

export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await fetchEndpoint(path, token);

        setData(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, token]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
}
