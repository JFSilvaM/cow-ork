import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "../contexts/AuthContext";
import BookingIcon from "./icons/BookingIcons";
import ReportIcon from "./icons/ReportIcon";
import LogoutIcon from "./icons/LogoutIcon";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const { setToken } = useAuth();

  return (
    <Menu>
      <Menu.Button className="focus:outline-none">
        <img
          src="images/avatars/default.png"
          alt="Avatar del usuario"
          className="w-12 rounded-full border p-1  hover:opacity-90"
        />
      </Menu.Button>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-72 divide-y divide-gray-100 rounded-md bg-white p-5 text-slate-700 shadow-2xl ring-1 ring-gray-200 focus:outline-none dark:bg-gray-700">
          <div className="pb-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${
                    active
                      ? "bg-gray-500 bg-opacity-10 dark:bg-gray-500 dark:text-white"
                      : "dark:text-white"
                  } flex w-full items-center gap-2 rounded-md p-5`}
                >
                  Nombre de usuario
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/bookings"
                  className={`${
                    active
                      ? "bg-gray-500 bg-opacity-10 dark:bg-gray-500 dark:text-white"
                      : "dark:text-white"
                  } flex w-full items-center gap-2 rounded-md p-2`}
                >
                  <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                    <BookingIcon />
                  </div>
                  Mis reservas
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/reports"
                  className={`${
                    active
                      ? "bg-gray-500 bg-opacity-10 dark:bg-gray-500 dark:text-white"
                      : "dark:text-white"
                  } flex w-full items-center gap-2 rounded-md p-2`}
                >
                  <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                    <ReportIcon />
                  </div>
                  Mis reportes
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="pt-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-gray-500 bg-opacity-10 dark:bg-gray-500 dark:text-white"
                      : "dark:text-white"
                  } flex w-full items-center gap-2 rounded-md p-2`}
                  onClick={() => setToken("")}
                >
                  <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                    <LogoutIcon />
                  </div>
                  Cerrar sesión
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
