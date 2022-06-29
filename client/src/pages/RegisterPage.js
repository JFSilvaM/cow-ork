import { Link } from "react-router-dom";
import Button from "../components/Button";
import Typography from "../components/Typography";

export default function RegisterPage() {
  return (
    //  onSubmit={handleSubmit}
    <form className="flex w-full justify-center">
      {/* {token && <Navigate to={from} />} */}

      <fieldset className="rounded border border-indigo-500 p-5 dark:border-emerald-500 sm:w-2/4">
        <legend className="px-3 dark:text-white">
          <Typography size="xxl">Registrarse</Typography>
        </legend>

        <label className="mb-5 block">
          <span className="block text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
            Nombre
          </span>

          <input
            type="text"
            name="first_name"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="Nombre"
            className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <label className="mb-5 block">
          <span className="block text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
            Apellidos
          </span>

          <input
            type="text"
            name="last_name"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            placeholder="Apellidos"
            className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <label className="mb-5 block">
          <span className="block text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
            E-mail
          </span>

          <input
            type="email"
            name="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
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
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <label className="mb-5 block">
          <span className="block text-slate-700 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
            Confirmar contraseña
          </span>

          <input
            type="password"
            name="passwordConfirmation"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            placeholder="Confirmar contraseña"
            className="mt-1 block w-full rounded-md px-3 py-2 shadow-sm ring-2 ring-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
          />
        </label>

        <div className="flex justify-center gap-5">
          <Button shape="rounded" size="sm">
            Registrarse
          </Button>

          <Link to={"/login"}>
            <Button shape="rounded" variant="flat" size="sm">
              Iniciar sesión
            </Button>
          </Link>
        </div>

        {/* {error && (
        <div className="flex justify-center pt-5">
          <Alert color="error" icon="error">
            {error.message}
          </Alert>
        </div>
      )} */}
      </fieldset>
    </form>
  );
}
