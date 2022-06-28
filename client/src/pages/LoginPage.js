import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchEndpoint("/auth/login", null, "POST", {
        email,
        password,
      });

      setError("");
      setToken(data.token);
      navigate(from, { replace: true });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {token && <Navigate to={from} />}
      <section className="flex justify-center">
        <form
          className="flex flex-col items-center gap-3 rounded-lg border-2 p-5"
          onSubmit={handleSubmit}
        >
          <label>
            E-mail:
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mx-3 rounded px-1 ring-2"
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mx-3 rounded px-1 ring-2"
            />
          </label>

          <Button
            className="w-fit cursor-pointer"
            color="primary"
            shape="rounded"
            size="sm"
          >
            Ingresar
          </Button>

          {error && (
            <Alert color="error" icon="error">
              {error.message}
            </Alert>
          )}
        </form>
      </section>
    </>
  );
}
