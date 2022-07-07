import { useLocation } from "react-router-dom";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function ReportsPage() {
  const location = useLocation();
  const { data: reports, loading, error } = useFetch(location.pathname);
  const pathname = location.pathname;

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

                <Typography>Fecha del reporte: {report.created_at}</Typography>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
