import Typography from "./Typography";

const colors = {
  primary:
    "border-indigo-800 bg-indigo-200 text-indigo-800 dark:border-emerald-800 dark:bg-emerald-200 dark:text-emerald-800",
  secondary:
    "border-slate-800 bg-slate-200 text-slate-800 dark:border-transparent",
  warning: "border-yellow-800 bg-yellow-200 text-yellow-800",
  success: "border-green-800 bg-green-200 text-green-800",
  error: "border-red-800 bg-red-200 text-red-800",
};

export default function Chip({ color = "secondary", children, ...props }) {
  props.className = [colors[color], props.className].join(" ").trim();

  return (
    <div className={`w-fit rounded border p-1 ${props.className}`}>
      <Typography color="inherit" weight="bold">
        {children}
      </Typography>
    </div>
  );
}
