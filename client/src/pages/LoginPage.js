import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import Typography from "../components/Typography";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuth();
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
      className="mx-2 flex w-full items-center justify-center"
      onSubmit={handleSubmit}
    >
      <fieldset className="w-full rounded border border-indigo-500 p-5 dark:border-emerald-500 sm:w-3/4 xl:w-1/2">
        <legend className="px-3 text-slate-800 dark:text-slate-200">
          <Typography size="xxl">Iniciar sesión</Typography>
        </legend>

        <label className="mb-5 block">
          <Typography
            as="span"
            className="block text-slate-800 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-slate-200"
          >
            E-mail
          </Typography>

          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            setValue={setEmail}
            placeholder="E-mail"
            className="mt-1 block w-full rounded-md bg-gray-200 px-3 py-2 shadow-sm ring-2 ring-indigo-500 placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <label className="mb-5 block">
          <Typography
            as="span"
            className="block text-slate-800 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-slate-200"
          >
            Contraseña
          </Typography>

          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="Password"
            className="mt-1 block w-full rounded-md bg-gray-200 px-3 py-2 shadow-sm ring-2 ring-indigo-500 placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <div className="mb-2">
          <Button shape="rounded" size="sm">
            Iniciar sesión
          </Button>
        </div>

        <Typography
          align="center"
          className="text-slate-800 dark:text-slate-200"
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
