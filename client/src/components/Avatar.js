const variants = {
  squared: "rounded-none",
  rounded: "rounded",
  circle: "rounded-full",
};

const sizes = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
  xxl: "w-32 h-32",
  xxxl: "w-48 h-48",
  xxxxl: "w-64 h-64",
};

export default function Avatar({
  variant = "squared",
  size = "md",
  alt = "",
  ...props
}) {
  props.className = [variants[variant], sizes[size], props.className]
    .join(" ")
    .trim();

  return <img {...props} alt={alt} />;
}
