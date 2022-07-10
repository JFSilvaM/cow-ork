import { useState } from "react";
import Alert from "../components/Alert";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";
import Input from "./Input";
import Spinner from "./Spinner";

export default function ReportForm({ spaceId }) {
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { data: categories, loading, error } = useFetch("/report_categories");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        space_id: spaceId,
        description,
        category_id: categoryId,
      };
      const data = await fetchEndpoint("/reports", token, "POST", body);

      if (data.error) {
        throw new Error(data.error);
      }

      setSuccessMessage(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
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
    <article className="flex w-full">
      <form
        className="flex w-full flex-col items-center gap-5 px-5"
        onSubmit={handleSubmit}
      >
        <Input
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          placeholder="Información del reporte"
          className="h-20 w-full rounded-md border p-2"
        />

        <select
          id="report_category"
          name="report_category"
          onChange={(e) => setCategoryId(e.target.value)}
          className="h-10 w-full rounded-md p-2"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Selecciona la categoria
          </option>

          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {successMessage && (
          <div className="mt-2 flex justify-center">
            <Alert color="success" icon="success">
              {successMessage.message}
            </Alert>
          </div>
        )}

        {errorMessage && (
          <div className="mt-2 flex justify-center">
            <Alert color="error" icon="error">
              {errorMessage}
            </Alert>
          </div>
        )}

        <Button size="sm" shape="rounded">
          Reportar
        </Button>
      </form>
    </article>
  );
}
