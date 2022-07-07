import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Input from "../components/Input";

export default function ReportEditPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const { data: report, loading, error } = useFetch(`/reports/${id}`, token);
  const { data: categories } = useFetch(`/report_categories`, token);
  const [spaceId, setSpaceId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (report) {
      setDescription(report.description);
      setStatus(report.status);
      setSpaceId(report.space_id);
      setCategoryId(report.category_id);
    }
  }, [report]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        description,
        status,
        space_id: spaceId,
        category_id: categoryId,
      };

      const data = await fetchEndpoint(`/reports/${id}`, token, "PUT", body);

      if (data?.status === "error") {
        throw new Error(data.message);
      }

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
    <article>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <Input
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          multiline
        />

        <select
          id="report_category"
          name="report_category"
          onChange={(e) => setCategoryId(e.target.value)}
          className="h-10 rounded-md px-2"
          value={categoryId}
          required
        >
          <option value="" disabled>
            Selecciona la categoria
          </option>
          {categories &&
            categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
        </select>

        <select
          name="status"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          required
        >
          <option value="">Select status</option>
          <option value="OPEN">Abierto</option>
          <option value="CLOSED">Cerrado</option>
          <option value="PENDING">Pendiente</option>
        </select>

        <input type="hidden" name="space_id" value={spaceId} />

        <Button size="sm" shape="rounded">
          Editar reporte
        </Button>

        {errorMessage && (
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        )}
      </form>
    </article>
  );
}
