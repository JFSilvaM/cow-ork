import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Typography from "../components/Typography";
import fetchEndpoint from "../helpers/fetchEndpoint";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      };
      const data = await fetchEndpoint("/auth/register", null, "POST", body);

      if (data.status === "error") {
        throw new Error(data.message);
      }

      setErrorMessage("");
      setSuccessMessage(data.message);
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error.message);
    }
  };

  return (
    <form
      className="flex w-full items-center justify-center"
      onSubmit={handleSubmit}
    >
      <fieldset className="rounded border border-indigo-500 p-5 dark:border-emerald-500 sm:w-2/4">
        <legend className="px-3 text-slate-800 dark:text-slate-200">
          <Typography size="xxl">Registrarse</Typography>
        </legend>

        <label className="mb-5 block">
          <Typography
            as="span"
            className="block text-slate-800 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-slate-200"
          >
            Nombre
          </Typography>

          <Input
            id="first_name"
            name="first_name"
            value={firstName}
            setValue={setFirstName}
            placeholder="Nombre"
            className="mt-1 block w-full rounded-md bg-gray-200 px-3 py-2 shadow-sm ring-2 ring-indigo-500 placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <label className="mb-5 block">
          <Typography
            as="span"
            className="block text-slate-800 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-slate-200"
          >
            Apellidos
          </Typography>

          <Input
            id="last_name"
            name="last_name"
            value={lastName}
            setValue={setLastName}
            placeholder="Apellidos"
            className="mt-1 block w-full rounded-md bg-gray-200 px-3 py-2 shadow-sm ring-2 ring-indigo-500 placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

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
            placeholder="Contraseña"
            className="mt-1 block w-full rounded-md bg-gray-200 px-3 py-2 shadow-sm ring-2 ring-indigo-500 placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <label className="mb-5 block">
          <Typography
            as="span"
            className="block text-slate-800 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-slate-200"
          >
            Confirmar contraseña
          </Typography>

          <Input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={passwordConfirmation}
            setValue={setPasswordConfirmation}
            placeholder="Confirmar contraseña"
            className="mt-1 block w-full rounded-md bg-gray-200 px-3 py-2 shadow-sm ring-2 ring-indigo-500 placeholder:text-slate-600 focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <div className="mb-2">
          <Button shape="rounded" size="sm">
            Registrarse
          </Button>
        </div>

        <Typography
          align="center"
          className="text-slate-800 dark:text-slate-200"
        >
          ¿Tienes cuenta?{" "}
          <Link to="/login" className="text-indigo-600 dark:text-emerald-600">
            Inicia sesión
          </Link>
        </Typography>

        {errorMessage && (
          <div className="flex justify-center pt-5">
            <Alert color="error" icon="error">
              {errorMessage}
            </Alert>
          </div>
        )}

        {successMessage && (
          <div className="flex justify-center pt-5">
            <Alert color="error" icon="error">
              {successMessage}
            </Alert>
          </div>
        )}
      </fieldset>
    </form>
  );
}
