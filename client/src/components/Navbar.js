import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";
import Dropdown from "./Dropdown";
import Avatar from "./Avatar";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const { token } = useAuth();

  useEffect(() => {
    document.documentElement.classList.add(darkMode ? "dark" : "light");
    document.documentElement.classList.remove(darkMode ? "light" : "dark");
    document.body.classList.add(darkMode ? "bg-gray-800" : "bg-white");
    document.body.classList.remove(darkMode ? "bg-white" : "bg-gray-800");
  }, [darkMode]);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow dark:bg-gray-800 dark:shadow-white">
      <ul className="container mx-auto flex items-center justify-between py-3 px-2">
        <li>
          <Link to="/" className="focus:outline-none">
            <Avatar src="/images/cow-ork_logo.png" alt="Cow-Ork logo" />
          </Link>
        </li>

        <li>
          <ul className="flex items-center justify-center gap-2">
            <li
              className="flex cursor-pointer justify-center"
              onClick={() => {
                setDarkMode(!darkMode);
                localStorage.setItem("darkMode", !darkMode);
              }}
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </li>

            {token ? (
              <li className="flex flex-col justify-center">
                <Dropdown />
              </li>
            ) : (
              <li>
                <Link to="/login">
                  <Button shape="rounded" size="sm">
                    Iniciar sesión
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </li>
      </ul>
    </nav>
  );
}
