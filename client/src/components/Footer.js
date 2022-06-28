import Typography from "./Typography";

export default function Footer() {
  return (
    <footer className="flex justify-center border-t py-5 dark:border-t-black dark:text-white">
      <Typography>&copy; {new Date().getFullYear()} | Cow-Ork</Typography>
    </footer>
  );
}
