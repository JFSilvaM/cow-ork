const colors = {
  base: "text-slate-800 dark:text-slate-200",
  muted: "text-slate-500 dark:text-slate-600",
  primary: "text-indigo-800 dark:text-emerald-800",
  inherit: "text-inherit",
};

const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  xxl: "text-2xl",
  xxxl: "text-3xl",
  xxxxl: "text-4xl",
};

const weights = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const alignments = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

export default function Typography({
  as = "p",
  color = "base",
  size = "md",
  weight = "normal",
  align = "left",
  children,
  ...props
}) {
  const CustomTag = as;

  props.className = [
    colors[color] || color,
    sizes[size],
    weights[weight],
    alignments[align],
    props.className,
  ]
    .join(" ")
    .trim();

  return <CustomTag children={children} {...props} />;
}
