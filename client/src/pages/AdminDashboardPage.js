import DashboardForm from "../components/DashboardForm";
import Typography from "../components/Typography";

export default function AdminDashboardPage() {
  return (
    <section className="flex w-full justify-between self-start">
      <article className="my-4">
        <Typography as="h4" size="xxl" className="mb-2">
          Tipos de espacios
        </Typography>
        <DashboardForm fetchUrl="/space_types" />
      </article>

      <article className="my-4">
        <Typography as="h4" size="xxl" className="mb-2">
          Servicios de espacios
        </Typography>
        <DashboardForm fetchUrl="/services" />
      </article>

      <article className="my-4">
        <Typography as="h4" size="xxl" className="mb-2">
          Categorías de reportes
        </Typography>
        <DashboardForm fetchUrl="/report_categories" />
      </article>
    </section>
  );
}
