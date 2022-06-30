import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import Typography from "../components/Typography";
import { Link } from "react-router-dom";
import Button from "../components/Button";

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
    <form
      className="flex w-full items-center justify-center"
      onSubmit={handleSubmit}
    >
      {token && <Navigate to={from} />}

      <fieldset className="rounded border border-indigo-500 p-5 dark:border-emerald-500 sm:w-2/4">
        <legend className="px-3 dark:text-white">
          <Typography size="xxl">Iniciar sesión</Typography>
        </legend>

        <label className="mb-5 block">
          <span className="block text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
            E-mail
          </span>

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <label className="mb-5 block">
          <span className="block text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
            Contraseña
          </span>

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <div className="mb-2">
          <Button shape="rounded" size="sm">
            Iniciar sesión
          </Button>
        </div>

        <Typography
          align="center"
          className="text-slate-700 dark:text-slate-100"
        >
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-indigo-600 dark:text-emerald-600"
          >
            Regístrate
          </Link>
        </Typography>

        {error && (
          <div className="flex justify-center pt-5">
            <Alert color="error" icon="error">
              {error.message}
            </Alert>
          </div>
        )}
      </fieldset>
    </form>
  );
}
