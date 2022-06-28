import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import useFetch from "../hooks/useFetch";

export default function ReportCategoriesPage() {
  const {
    data: reportCategories,
    loading,
    error,
  } = useFetch("/report_categories");

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
      {reportCategories.map((reportCategory) => (
        <article key={reportCategory.id}>
          <Typography>{reportCategory.name}</Typography>
        </article>
      ))}
    </section>
  );
}
