import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function ReportsPage() {
  const { data: reports, loading, error } = useFetch("/reports");

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
    <section>
      {reports.map((report) => (
        <article key={report.id}>
          <Typography>{report.space_name}</Typography>
          <Typography>{report.description}</Typography>
          <Typography>{report.category_name}</Typography>
          <Typography>{report.status}</Typography>
          <Typography>{report.created_at}</Typography>
        </article>
      ))}
    </section>
  );
}
