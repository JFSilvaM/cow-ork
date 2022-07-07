import { useEffect, useState } from "react";
import CheckIcon from "./icons/CheckIcon";
import CloseIcon from "./icons/CloseIcon";
import ErrorIcon from "./icons/ErrorIcon";

const icons = {
  success: <CheckIcon />,
  error: <ErrorIcon />,
};

const variants = {
  filled: {
    success: "bg-green-800 text-white font-bold fill-current",
    error: "bg-red-800 text-white font-bold fill-current",
  },
  outlined: {
    success: "bg-green-100 border border-green-800 text-green-800 fill-current",
    error: "bg-red-100 border border-red-800 text-red-800 fill-current",
  },
};

export default function Alert({
  color = "success",
  dismissible = false,
  icon,
  duration,
  variant = "outlined",
  children,
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (duration) {
      setTimeout(() => {
        setIsOpen(false);
      }, duration * 1000);
    }
  });

  return (
    isOpen && (
      <div
        className={`flex max-w-fit justify-between rounded px-4 py-2 ${variants[variant][color]}`}
        role="alert"
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icons[icon]}</span>}

          <p className="text-sm">{children}</p>
        </div>

        {dismissible && (
          <div className="flex items-center justify-end">
            <button onClick={() => setIsOpen(false)} title="Cerrar">
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    )
  );
}
