import DashboardForm from "../components/DashboardForm";
import Typography from "../components/Typography";

export default function AdminDashboardPage() {
  return (
    <section className="flex w-full flex-col self-start px-2 text-slate-800 dark:text-slate-200 xl:flex-row xl:gap-10">
      <article className="flex w-full flex-col gap-2">
        <Typography
          as="h4"
          size="xxl"
          className="rounded bg-indigo-500 p-3 text-center text-white dark:bg-emerald-500"
        >
          Tipos de espacios
        </Typography>

        <DashboardForm fetchUrl="/space_types" />
      </article>

      <article className="my-5 flex w-full flex-col gap-2 xl:my-0">
        <Typography
          as="h4"
          size="xxl"
          className="rounded bg-indigo-500 p-3 text-center text-white dark:bg-emerald-500"
        >
          Servicios de espacios
        </Typography>

        <DashboardForm fetchUrl="/services" />
      </article>

      <article className="flex w-full flex-col gap-2">
        <Typography
          as="h4"
          size="xxl"
          className="rounded bg-indigo-500 p-3 text-center text-white dark:bg-emerald-500"
        >
          Categorías de reportes
        </Typography>

        <DashboardForm fetchUrl="/report_categories" />
      </article>
    </section>
  );
}
