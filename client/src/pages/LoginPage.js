import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import Typography from "../components/Typography";
import { Link } from "react-router-dom";

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
    <main className="container mx-auto flex flex-grow items-center justify-center px-3 md:px-0">
      {token && <Navigate to={from} />}
      <form className="flex w-full justify-center" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col items-center gap-7 rounded border border-indigo-500 p-5 dark:border-emerald-500 sm:w-2/4">
          <legend className="px-3 dark:text-white">
            <Typography size="xl">Log In</Typography>
          </legend>

          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="mx-3 h-10 w-full rounded px-1 ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mx-3 h-10 w-full rounded px-1 ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500"
          />

          <div className="flex gap-5">
            <button className="w-fit rounded bg-indigo-500 px-5 py-2 text-white hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 active:bg-indigo-700 dark:bg-emerald-500 hover:dark:bg-emerald-600 focus:dark:ring-emerald-300 active:dark:bg-emerald-700">
              <Typography>Ingresar</Typography>
            </button>

            <Link
              to={"/register"}
              className="w-fit rounded px-5 py-2 underline underline-offset-2 dark:text-white"
            >
              <Typography>Sign Up</Typography>
            </Link>
          </div>

          {error && (
            <Alert color="error" icon="error">
              {error.message}
            </Alert>
          )}
        </fieldset>
      </form>
    </main>
  );
}
