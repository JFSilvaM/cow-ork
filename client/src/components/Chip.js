import Typography from "./Typography";

export default function Chip({ children }) {
  return (
    <div className="rounded border border-slate-500 p-1 dark:border-transparent dark:bg-white">
      <Typography color="muted" weight="bold" size="sm">
        {children}
      </Typography>
    </div>
  );
}
