import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Typography from "./Typography";

export default function ErrorPage({ image, children }) {
  const navigate = useNavigate();

  return (
    <section className="flex w-full flex-col items-center justify-center gap-10">
      <img src={`/images/${image}`} alt="Error page" />

      <Typography weight="bold" size="xxxxl">
        {children}
      </Typography>

      <Button shape="rounded" size="sm" onClick={() => navigate(-1)}>
        Volver atrás
      </Button>
    </section>
  );
}
