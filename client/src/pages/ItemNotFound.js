import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ErrorPage from "../components/ErrorPage";
import Typography from "../components/Typography";

export default function ItemNotFound({ children, simple }) {
  const navigate = useNavigate();

  return (
    <ErrorPage image="john-travolta.webp">
      <Typography as="h3" weight="bold" size="xxl">
        {children}
      </Typography>

      {!simple && (
        <Button shape="rounded" size="sm" onClick={() => navigate("/")}>
          Ir al inicio
        </Button>
      )}
    </ErrorPage>
  );
}
