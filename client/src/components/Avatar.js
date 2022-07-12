const variants = {
  squared: "rounded-none",
  rounded: "rounded",
  circle: "rounded-full",
};

export default function Avatar({ variant = "squared", alt = "", ...props }) {
  props.className = [variants[variant], props.className].join(" ").trim();

  return <img {...props} alt={alt} />;
}
