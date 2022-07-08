import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminTools from "../components/AdminTools";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import formatDate from "../helpers/formatDate";
import useFetch from "../hooks/useFetch";

export default function ReportsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { data: reports, loading, error } = useFetch(location.pathname);
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      // TODO: Add a confirmation message before delete

      const data = await fetchEndpoint(`/reports/${id}`, token, "DELETE");

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      navigate("/");
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
    <section className="flex w-full justify-center px-3 text-slate-800 dark:text-slate-200">
      <div className="flex w-full flex-col gap-5 lg:w-3/4">
        <Typography
          as="h4"
          size="xxxl"
          weight="bold"
          className="rounded bg-indigo-500 p-3 text-center text-white dark:bg-emerald-500"
        >
          {pathname === "/reports" ? "Mis reportes" : "Todos los reportes"}
        </Typography>

        {reports.map((report) => (
          <article
            key={report.id}
            className="flex flex-col rounded p-2 shadow dark:shadow-white md:flex-row"
          >
            <img
              className="w-full rounded object-cover md:w-2/5 xl:w-1/2"
              src={`/images/spaces/${report.image}`}
              alt={report.space_name}
            />

            <div className="flex w-full flex-col gap-5 p-5">
              <div className="flex-1">
                <AdminTools
                  handleDelete={(e) => handleDelete(e, report.id)}
                  handleEdit={() => navigate(`/reports/${report.id}/edit`)}
                />
              </div>

              <div className="flex items-end justify-between">
                <Typography size="xxl" weight="bold">
                  {report.space_name}
                </Typography>

                {report.status === "PENDING" && (
                  <Typography
                    className="text-yellow-500"
                    size="xl"
                    weight="bold"
                  >
                    {report.status}
                  </Typography>
                )}

                {report.status === "OPEN" && (
                  <Typography
                    className="text-green-500"
                    size="xl"
                    weight="bold"
                  >
                    {report.status}
                  </Typography>
                )}

                {report.status === "CLOSED" && (
                  <Typography className="text-red-500" size="xl" weight="bold">
                    {report.status}
                  </Typography>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Typography className="flex gap-1">
                  Categoría:
                  <Typography weight="bold">{report.category_name}</Typography>
                </Typography>

                <Typography>Descripción: {report.description}</Typography>

                <Typography>
                  Fecha del reporte: {formatDate(report.created_at)}
                </Typography>
              </div>
            </div>
          </article>
        ))}
      </div>

      {errorMessage && (
        <div className="flex justify-center pt-5">
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        </div>
      )}
    </section>
  );
}
