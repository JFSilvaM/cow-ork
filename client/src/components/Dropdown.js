import { Menu, Transition, Disclosure } from "@headlessui/react";
import { useAuth } from "../contexts/AuthContext";
import BookingIcon from "./icons/BookingIcons";
import ReportIcon from "./icons/ReportIcon";
import LogoutIcon from "./icons/LogoutIcon";
import DashboardIcon from "./icons/DashboardIcon";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import fetchEndpoint from "../helpers/fetchEndpoint";
import decodeToken from "../helpers/decodeToken";
import Typography from "./Typography";
import AddIcon from "./icons/AddIcon";

export default function Dropdown() {
  const { token, setToken } = useAuth();
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");
  const admin = token && decodeToken(token).is_admin;

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        return;
      }

      const data = await fetchEndpoint("/users/profile", token);

      if (data?.status === "error") {
        console.error(data.message);
      }

      setFullName(`${data.first_name} ${data.last_name}`);
      setAvatar(data.avatar);
    };

    fetchUser();
  }, [token, setToken]);

  return (
    <Menu>
      <Menu.Button className="h-12 w-12 overflow-hidden rounded-full bg-white focus:outline-none">
        <Avatar
          src={`${process.env.REACT_APP_SERVER_URL}/images/avatars/${avatar}`}
          alt="Avatar"
          className="h-full w-full hover:opacity-70"
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
        <Menu.Items
          as="section"
          className="absolute right-0 mt-1 w-72 rounded-md bg-white p-5 text-slate-800 shadow-2xl ring-1 ring-gray-200 focus:outline-none dark:bg-gray-700"
        >
          <Menu.Item as="article">
            {({ active }) => (
              <Link
                to="/profile"
                className={`${
                  active
                    ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                    : "dark:text-slate-200"
                } flex w-full items-center justify-center gap-5 rounded-md border p-4 shadow`}
              >
                <Typography
                  as="h4"
                  size="xl"
                  weight="bold"
                  className="truncate"
                >
                  {fullName}
                </Typography>
              </Link>
            )}
          </Menu.Item>

          {admin ? (
            <>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/dashboard"
                    className={`${
                      active
                        ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                        : "dark:text-slate-200"
                    } my-2 flex w-full items-center gap-2 rounded-md px-2 py-1`}
                  >
                    <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                      <DashboardIcon />
                    </div>
                    <Typography>Administración</Typography>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/spaces/new"
                    className={`${
                      active
                        ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                        : "dark:text-slate-200"
                    } my-2 flex w-full items-center gap-2 rounded-md px-2 py-1`}
                  >
                    <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                      <AddIcon />
                    </div>
                    <Typography>Crear espacio</Typography>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/bookings"
                    className={`${
                      active
                        ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                        : "dark:text-slate-200"
                    } my-2 flex w-full items-center gap-2 rounded-md px-2 py-1`}
                  >
                    <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                      <BookingIcon />
                    </div>

                    <Typography>Mis Reservas</Typography>
                  </Link>
                )}
              </Menu.Item>

              <Disclosure as="article">
                <Disclosure.Button className="my-2 flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-500 hover:bg-opacity-10 hover:shadow dark:text-slate-200 hover:dark:bg-gray-500 hover:dark:text-slate-200">
                  <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                    <ReportIcon />
                  </div>

                  <Typography>Reportes</Typography>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-col gap-2 border-y pl-12">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/reports"
                        className={`${
                          active
                            ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                            : "dark:text-slate-200"
                        } mt-2 flex rounded-md p-2`}
                      >
                        Mis reportes
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/reports/all"
                        className={`${
                          active
                            ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                            : "dark:text-slate-200"
                        } mb-2 rounded-md p-2 `}
                      >
                        Todos los reportes
                      </Link>
                    )}
                  </Menu.Item>
                </Disclosure.Panel>
              </Disclosure>
            </>
          ) : (
            <>
              <Menu.Item as="article">
                {({ active }) => (
                  <Link
                    to="/bookings"
                    className={`${
                      active
                        ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                        : "dark:text-slate-200"
                    } my-2 flex w-full items-center gap-2 rounded-md py-1 px-2`}
                  >
                    <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                      <BookingIcon />
                    </div>
                    Mis reservas
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item as="article">
                {({ active }) => (
                  <Link
                    to="/reports"
                    className={`${
                      active
                        ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                        : "dark:text-slate-200"
                    } my-2 flex w-full items-center gap-2 rounded-md py-1 px-2`}
                  >
                    <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                      <ReportIcon />
                    </div>
                    Mis reportes
                  </Link>
                )}
              </Menu.Item>
            </>
          )}

          <Menu.Item as="article">
            {({ active }) => (
              <button
                className={`${
                  active
                    ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-slate-200"
                    : "dark:text-slate-200"
                } mt-2 flex w-full items-center gap-2 rounded-md px-2 py-1`}
                onClick={() => setToken("")}
              >
                <div className="rounded-full bg-gray-300 p-2 focus:outline-none dark:bg-gray-400">
                  <LogoutIcon />
                </div>
                Cerrar sesión
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
