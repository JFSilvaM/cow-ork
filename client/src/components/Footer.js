import Typography from "./Typography";

export default function Footer() {
  return (
    <footer className="flex justify-center py-5">
      <Typography>&copy; {new Date().getFullYear()} | Cow-Ork</Typography>
    </footer>
  );
}
