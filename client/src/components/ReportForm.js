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
    <article>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          placeholder="Información del reporte"
          className="h-20 rounded-md border p-2"
        />

        <select
          id="report_category"
          name="report_category"
          onChange={(e) => setCategoryId(e.target.value)}
          className="h-10 rounded-md px-2"
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

        <div className="flex justify-center">
          <Button size="sm" shape="rounded">
            Reportar
          </Button>
        </div>
      </form>

      {errorMessage && (
        <div className="flex justify-center pt-5">
          <Alert color="error" icon="error">
            {errorMessage}
          </Alert>
        </div>
      )}
    </article>
  );
}
