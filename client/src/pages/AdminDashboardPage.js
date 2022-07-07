import DashboardForm from "../components/DashboardForm";
import Typography from "../components/Typography";

export default function AdminDashboardPage() {
  return (
    <section className="grid w-full grid-cols-3 justify-between self-start">
      <article className="px-4">
        <Typography as="h4" size="xxl" className="mb-2 px-2">
          Tipos de espacios
        </Typography>
        <DashboardForm fetchUrl="/space_types" />
      </article>

      <article className="px-4">
        <Typography as="h4" size="xxl" className="mb-2 px-2">
          Servicios de espacios
        </Typography>
        <DashboardForm fetchUrl="/services" />
      </article>

      <article className="px-4">
        <Typography as="h4" size="xxl" className="mb-2 px-2">
          Categorías de reportes
        </Typography>
        <DashboardForm fetchUrl="/report_categories" />
      </article>
    </section>
  );
}
