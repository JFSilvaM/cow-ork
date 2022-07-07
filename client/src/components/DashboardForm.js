import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";
import AdminTools from "./AdminTools";
import Alert from "./Alert";
import Button from "./Button";
import Input from "./Input";
import Spinner from "./Spinner";

export default function DashboardForm({ fetchUrl }) {
  const [value, setValue] = useState("");
  const [values, setValues] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: namesList, loading, error } = useFetch(fetchUrl);
  const { token } = useAuth();

  useEffect(() => {
    if (namesList) {
      setValues(namesList);
    }
  }, [namesList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchEndpoint(fetchUrl, token, "POST", {
        name: value,
      });

      if (data.status === "error") {
        throw new Error(data.message);
      }

      setErrorMessage("");
      setValue("");

      const newNames = await fetchEndpoint(fetchUrl, token);

      setValues(newNames);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleEdit = async (e, id) => {
    e.preventDefault();

    try {
      const body = { name: value };
      const data = await fetchEndpoint(`${fetchUrl}/${id}`, token, "PUT", body);

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      const values = await fetchEndpoint(fetchUrl, token);

      setValues(values);
      setValue("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      const data = await fetchEndpoint(`${fetchUrl}/${id}`, token, "DELETE");

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      const values = await fetchEndpoint(fetchUrl, token);

      setValues(values);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error);
    }
  };

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
    <article className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          id="name"
          name="name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-md bg-gray-200 px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:text-slate-800 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
        />

        <Button size="sm" shape="rounded">
          Guardar
        </Button>
      </form>

      {errorMessage && (
        <Alert color="error" icon="error">
          {errorMessage.message}
        </Alert>
      )}

      <ul className="flex flex-col gap-4">
        {values &&
          values.map((v) => (
            <AdminTools
              value={v}
              handleEdit={(e) => handleEdit(e, v.id)}
              handleDelete={(e) => handleDelete(e, v.id)}
            />
          ))}
      </ul>
    </article>
  );
}
