import Typography from "./Typography";

export default function Footer() {
  return (
    <footer className="flex justify-center border-t py-5 text-slate-800 dark:border-t-black dark:text-slate-200">
      <Typography>&copy; {new Date().getFullYear()} | Cow-Ork</Typography>
    </footer>
  );
}
