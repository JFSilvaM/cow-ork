import { Link } from "react-router-dom";
import Typography from "./Typography";
import MoonIcon from "./icons/MoonIcon";
import SunIcon from "./icons/SunIcon";
import { useEffect, useState } from "react";

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

  return (
    <nav className="sticky top-0 border-b bg-white shadow">
      <ul className="container mx-auto flex items-center justify-between p-3">
        <li>
          <Link to={"/"}>Logo</Link>
        </li>

        <li>
          <ul className="flex items-center gap-5">
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
              <Link to={"/login"}>
                <Typography
                  className="rounded bg-indigo-500 px-3 py-2 text-white"
                  size="sm"
                >
                  Log In / Sign Up
                </Typography>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
