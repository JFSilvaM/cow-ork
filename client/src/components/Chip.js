const colors = {
  redIndigo: "bg-gradient-to-r from-red-500 to-indigo-500",
  yellowEmerald: "bg-gradient-to-r from-yellow-500 to-emerald-500",
  greenBlue: "bg-gradient-to-r from-green-500 to-blue-500",
  redYellow: "bg-gradient-to-r from-red-500 to-yellow-500",
  emeraldRed: "bg-gradient-to-r from-emerald-500 to-red-500",
  indigoYellow: "bg-gradient-to-r from-indigo-500 to-yellow-500",
  redBlue: "bg-gradient-to-r from-red-500 to-blue-500",
};

export default function Chip({ children, color }) {
  return (
    <div className={`rounded-full ${colors[color]} p-[2px]`}>
      <div className="rounded-3xl bg-white px-3 text-gray-600">{children}</div>
    </div>
  );
}
