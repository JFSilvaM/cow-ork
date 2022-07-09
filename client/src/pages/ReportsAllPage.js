import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ReportCard from "../components/ReportCard";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";
import ItemNotFound from "./ItemNotFound";

export default function ReportsAllPage() {
  const { data: reportsList, loading } = useFetch("/reports/all");
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (reportsList) {
      setReports(reportsList);
    }
  }, [reportsList]);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    setIsOpen(false);

    try {
      const data = await fetchEndpoint(`/reports/${id}`, token, "DELETE");

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      const newReports = reports.filter((report) => report.id !== id);
      setReports(newReports);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="flex w-full justify-center px-3 text-slate-800 dark:text-slate-200">
      <div className="flex w-full flex-col gap-5 lg:w-3/4">
        <Typography as="h4" size="xxxl" weight="bold" align="center">
          Todos los reportes
        </Typography>

        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={(e) => handleDelete(e, selectedItem)}
        >
          ¿Realmente deseas borrar el reporte número{" "}
          <span className="font-semibold italic">{selectedItem}</span>?
        </Modal>

        {reports.length ? (
          reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              setIsOpen={setIsOpen}
              setSelectedItem={setSelectedItem}
            />
          ))
        ) : (
          <ItemNotFound>No hay ningún reporte</ItemNotFound>
        )}
      </div>
    </section>
  );
}
