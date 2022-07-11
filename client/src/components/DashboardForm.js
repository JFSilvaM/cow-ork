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
import Modal from "./Modal";

export default function DashboardForm({ fetchUrl }) {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
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
    setIsOpen(false);

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
      <div className="flex">
        <Alert color="error" icon="error">
          Error: {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <article>
      <form onSubmit={handleSubmit} className="mb-4 flex px-2">
        <Input
          id="name"
          name="name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mr-2 w-full"
        />

        <Button size="sm" shape="rounded">
          Guardar
        </Button>
      </form>

      {errorMessage && (
        <aside className="mb-4 flex px-2">
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        </aside>
      )}

      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={(e) => handleDelete(e, selectedItem.id)}
      >
        ¿Realmente deseas borrar el elemento{" "}
        <span className="font-semibold italic">{selectedItem.name}</span>?
      </Modal>

      <ul>
        {values &&
          values.map((v) => (
            <li
              key={v.id}
              className="flex items-center justify-between rounded p-2 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <Typography>{v.name}</Typography>

              <AdminTools
                handleEdit={(e) => handleEdit(e, v.id)}
                handleDelete={() => {
                  setIsOpen(true);
                  setSelectedItem(v);
                }}
              />
            </li>
          ))}
      </ul>
    </article>
  );
}
