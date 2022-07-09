import { useNavigate } from "react-router-dom";
import formatDate from "../helpers/formatDate";
import AdminTools from "./AdminTools";
import Typography from "./Typography";

export default function ReportCard({ report, setIsOpen, setSelectedItem }) {
  const navigate = useNavigate();

  return (
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
            handleDelete={() => {
              setIsOpen(true);
              setSelectedItem(report.id);
            }}
            handleEdit={() => navigate(`/reports/${report.id}/edit`)}
          />
        </div>

        <div className="flex items-end justify-between">
          <Typography size="xxl" weight="bold">
            {report.space_name}
          </Typography>

          {report.status === "PENDING" && (
            <Typography className="text-yellow-500" size="xl" weight="bold">
              {report.status}
            </Typography>
          )}

          {report.status === "OPEN" && (
            <Typography className="text-green-500" size="xl" weight="bold">
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
  );
}
