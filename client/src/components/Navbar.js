import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import Button from "./Button";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.add(darkMode ? "dark" : "light");
    document.documentElement.classList.remove(darkMode ? "light" : "dark");
    document.body.classList.add(darkMode ? "bg-gray-800" : "bg-white");
    document.body.classList.remove(darkMode ? "bg-white" : "bg-gray-800");
  }, [darkMode]);

  const logOut = async function () {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow dark:bg-gray-800 dark:shadow-white">
      <ul className="container mx-auto flex items-center justify-between py-3">
        <li className="dark:text-white">
          <Link to={"/"}>
            <img src="cow-ork_logo.png" alt="Cow-Ork logo" width="150" />
          </Link>
        </li>

        <li>
          <ul className="flex items-center gap-2">
            <li
              className="cursor-pointer"
              onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem("darkMode", !darkMode);
              }}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </li>

            <li>
              <Button shape="rounded" size="sm" onClick={() => logOut()}>
                Cerrar sesión
              </Button>
            </li>

            <li>
              <Button shape="rounded" size="sm">
                <Link to={"/login"}>Iniciar sesión</Link>
              </Button>
            </li>

            <li>
              <Button shape="rounded" size="sm">
                <Link to={"/register"}>Registrarse</Link>
              </Button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
