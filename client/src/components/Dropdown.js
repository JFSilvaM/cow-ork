import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "../contexts/AuthContext";
import BookingIcon from "./icons/BookingIcons";
import ReportIcon from "./icons/ReportIcon";
import LogoutIcon from "./icons/LogoutIcon";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useEffect, useState } from "react";
import fetchEndpoint from "../helpers/fetchEndpoint";

export default function Dropdown() {
  const { token, setToken } = useAuth();
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState("");

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
      <Menu.Button className="h-12 w-12 overflow-hidden rounded-full border-2 border-indigo-500 bg-white focus:outline-none dark:border-emerald-500">
        <Avatar
          src={`/images/avatars/${avatar}`}
          alt="Avatar"
          className="h-full w-full"
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
        <Menu.Items className="absolute right-0 ml-2 mt-1 w-72 divide-y divide-gray-100 rounded-md bg-white p-5 text-slate-700 shadow-2xl ring-1 ring-gray-200 focus:outline-none dark:bg-gray-700">
          <div className="pb-2">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`${
                    active
                      ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-white"
                      : "dark:text-white"
                  } flex w-full items-center justify-center gap-5 rounded-md p-3`}
                >
                  <Avatar src={`/images/avatars/${avatar}`} alt="Avatar" />

                  {fullName}
                </Link>
              )}
            </Menu.Item>
          </div>

          <div className="py-2">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/bookings"
                  className={`${
                    active
                      ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-white"
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
                      ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-white"
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

          <div className="pt-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-gray-500 bg-opacity-10 shadow dark:bg-gray-500 dark:text-white"
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
