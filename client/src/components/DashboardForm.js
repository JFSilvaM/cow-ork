import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";
import AdminTools from "./AdminTools";
import Alert from "./Alert";
import Button from "./Button";
import Input from "./Input";
import Spinner from "./Spinner";
import Typography from "./Typography";

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
    <article>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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

      <ul>
        {values &&
          values.map((v) => (
            <li key={v.id} className="flex">
              <Typography>{v.name}</Typography>
              <AdminTools
                fetchUrl={fetchUrl}
                id={v.id}
                value={value}
                setValue={setValue}
                setValues={setValues}
                setErrorMessage={setErrorMessage}
              />
            </li>
          ))}
      </ul>
    </article>
  );
}
