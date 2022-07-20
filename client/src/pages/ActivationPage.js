import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import fetchEndpoint from "../helpers/fetchEndpoint";

export default function ActivationPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateUser = async () => {
      try {
        const data = await fetchEndpoint(`/auth/activate/${code}`);

        if (data?.status === "error") {
          throw new Error(data.message);
        }

        if (data?.status === "ok") {
          setErrorMessage("");
          setSuccessMessage(data);
        }
      } catch (error) {
        setSuccessMessage("");
        setErrorMessage(error);
      }
    };

    activateUser();
  }, [code]);

  return (
    <article className="flex w-full flex-col items-center">
      {errorMessage && (
        <div className="mt-2 flex justify-center">
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        </div>
      )}

      {successMessage && (
        <div className="mt-2 flex justify-center">
          <Alert color="success" icon="success">
            {successMessage.message}
          </Alert>
        </div>
      )}

      <div className="my-3">
        <Button shape="rounded" size="sm" onClick={() => navigate("/")}>
          Ir al inicio
        </Button>
      </div>
    </article>
  );
}
