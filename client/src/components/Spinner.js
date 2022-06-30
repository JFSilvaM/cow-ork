import SpinnerIcon from "./icons/SpinnerIcon";

const sizes = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

export default function Spinner({ size = "md" }) {
  return (
    <div className={`${sizes[size]} m-auto`}>
      <SpinnerIcon />
    </div>
  );
}
