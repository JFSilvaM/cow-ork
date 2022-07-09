import Typography from "./Typography";

export default function Footer() {
  return (
    <footer className="py-5">
      <Typography size="sm" align="center">
        &copy; {new Date().getFullYear()} | Cow-Ork por{" "}
        <a
          href="https://github.com/arlomba"
          className="font-bold hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          @arlomba
        </a>{" "}
        y{" "}
        <a
          href="https://github.com/JFSilvaM"
          className="font-bold hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          @JFSilvaM
        </a>
      </Typography>
    </footer>
  );
}
