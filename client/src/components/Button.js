const sizes = {
  xs: "p-2",
  sm: "px-4 py-2",
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

const variants = {
  filled: {
    primary:
      "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 dark:bg-emerald-500 hover:dark:bg-emerald-600 active:dark:bg-emerald-700 text-white font-bold focus:outline-none",
    secondary: "bg-slate-800 text-white dark:bg-slate-600 font-bold",
    success:
      "bg-green-800 text-white font-bold hover:bg-green-200 active:bg-green-300",
    error: "bg-red-800 text-white font-bold hover:bg-red-200 active:bg-red-300",
  },
  flat: {
    primary:
      "bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300 text-indigo-800 dark:bg-emerald-100 hover:dark:bg-emerald-200 active:dark:bg-emerald-300 dark:text-emerald-800 font-bold focus:outline-none",
    secondary: "bg-slate-100 text-slate-800 font-bold",
    success:
      "bg-green-100 text-green-800 font-bold hover:bg-green-200 active:bg-green-300",
    error:
      "bg-red-100 text-red-800 font-bold hover:bg-red-200 active:bg-red-300",
  },
  outlined: {
    primary:
      "bg-indigo-100 text-indigo-800 border border-indigo-800 dark:bg-emerald-100 dark:text-emerald-800 dark:border-emerald-800 font-bold focus:outline-none",
    secondary: "bg-slate-100 text-slate-800 border border-slate-800 font-bold",
    success:
      "bg-green-100 text-green-800 border border-green-800 font-bold hover:bg-green-200 active:bg-green-300",
    error:
      "bg-red-100 text-red-800 border border-red-800 font-bold hover:bg-red-200 active:bg-red-300",
  },
  link: {
    primary:
      "text-indigo-800 dark:text-emerald-200 font-bold bg-transparent hover:underline",
    secondary:
      "text-slate-800 dark:text-slate-200 font-bold bg-transparent hover:underline",
    success: "text-green-800 dark:text-green-200 font-bold bg-transparent",
    error: "text-red-800 dark:text-red-200 font-bold bg-transparent",
  },
};

const shapes = {
  rounded: "rounded",
  squared: "rounded-none",
};

export default function Button({
  color = "primary",
  icon,
  shape = "squared",
  size = "md",
  variant = "filled",
  ...props
}) {
  props.className = [
    shapes[shape],
    sizes[size],
    variants[variant][color],
    props.className,
  ]
    .join(" ")
    .trim();

  return (
    <button {...props}>
      <div className="flex">
        {icon && <span className="mr-2">{icon}</span>}
        <span>{props.children}</span>
      </div>
    </button>
  );
}
