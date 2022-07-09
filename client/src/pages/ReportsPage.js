import { useState } from "react";
import Alert from "../components/Alert";
import Modal from "../components/Modal";
import ReportCard from "../components/ReportCard";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";

export default function ReportsPage() {
  const { data: reports, loading, error } = useFetch("/reports");
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (e, id) => {
    e.preventDefault();
    setIsOpen(false);

    try {
      const data = await fetchEndpoint(`/reports/${id}`, token, "DELETE");

      if (data?.status === "error") {
        throw new Error(data.message);
      }
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
          Mis reportes
        </Typography>

        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={(e) => handleDelete(e, selectedItem)}
        >
          ¿Realmente deseas borrar el reporte número{" "}
          <span className="font-semibold italic">{selectedItem}</span>?
        </Modal>

        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            setIsOpen={setIsOpen}
            setSelectedItem={setSelectedItem}
          />
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
