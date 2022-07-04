import { useEffect, useState } from "react";

export default function Switch({ disabled = false, checked, ...props }) {
  const [toggle, setToggle] = useState(checked);

  useEffect(() => {
    setToggle(checked);
  }, [checked]);

  return (
    <label className={`relative h-8 w-14 ${disabled ? "opacity-75" : ""}`}>
      <input
        type="checkbox"
        className="cursor-pointer opacity-0"
        checked={toggle}
        onChange={() => setToggle(!toggle)}
        disabled={disabled}
        {...props}
      />
      <div
        className={`slider ${
          toggle ? "bg-indigo-600 dark:bg-emerald-600" : "bg-slate-400"
        }`}
      ></div>
    </label>
  );
}
