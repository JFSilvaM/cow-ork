import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

export default function AdminTools({
  fetchUrl,
  id,
  value,
  setValue,
  setValues,
  setErrorMessage,
}) {
  const { token } = useAuth();

  const handleEdit = async (e) => {
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

  const handleDelete = async () => {
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

  return (
    <section className="flex space-x-2">
      <button title="Editar" onClick={handleEdit}>
        <EditIcon />
      </button>
      <button title="Borrar" onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </section>
  );
}
